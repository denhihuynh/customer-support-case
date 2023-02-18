data "archive_file" "this" {
  type        = "zip"
  output_path = "/tmp/${var.name}.zip"
  source_dir  = "${path.module}/../src"
  excludes    = var.excludes
}

resource "google_storage_bucket" "this" {
  name                        = var.bucket_name
  project                     = var.project
  location                    = var.bucket_location
  force_destroy               = true
  uniform_bucket_level_access = true
  storage_class               = var.bucket_storage_class

  versioning {
    enabled = var.bucket_versioning
  }
}

resource "google_storage_bucket_object" "this" {
  name   = "${var.name}.${data.archive_file.this.output_sha}.zip"
  bucket = google_storage_bucket.this.id
  source = data.archive_file.this.output_path
}

resource "google_service_account" "account" {
  account_id   = "cf-sa-${var.name}"
  display_name = "Service Account - used for the cloud function ${var.name}"
}

resource "google_project_iam_custom_role" "cloud-function-role" {
  role_id     = "cf_role_${var.cf-role-name}"
  title       = "Role used for ${var.name} cloud function"
  description = "Role used for ${var.name} cloud function"
  permissions = ["datastore.entities.create"]
}

# Permissions on the service account used by the function
resource "google_project_iam_member" "member" {
  project = var.project
  role    = google_project_iam_custom_role.cloud-function-role.id
  member  = "serviceAccount:${google_service_account.account.email}"
}

resource "google_cloudfunctions2_function" "this" {
  name        = var.name
  location    = var.location
  description = var.description
  project     = var.project
  labels      = var.labels

  build_config {
    runtime     = var.runtime
    entry_point = var.entry_point

    source {
      storage_source {
        bucket = google_storage_bucket.this.id
        object = google_storage_bucket_object.this.name
      }
    }
  }

  service_config {
    min_instance_count             = var.min_instance_count
    max_instance_count             = var.max_instance_count
    timeout_seconds                = var.timeout_seconds
    environment_variables          = var.environment_variables
    ingress_settings               = var.ingress_settings
    all_traffic_on_latest_revision = var.all_traffic_on_latest_revision
    service_account_email = google_service_account.account.email
  }
}

# IAM permission to allow other to call funciton
resource "google_cloudfunctions2_function_iam_member" "member" {
  project = google_cloudfunctions2_function.this.project
  location = google_cloudfunctions2_function.this.location
  cloud_function = google_cloudfunctions2_function.this.name
  role = "roles/cloudfunctions.invoker"
  member = "allUsers"
}