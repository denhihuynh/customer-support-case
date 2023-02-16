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

resource "google_cloudfunctions_function" "this" {
  name                  = var.name
  description           = var.description
  runtime               = var.runtime
  available_memory_mb   = 128
  source_archive_bucket = google_storage_bucket.this.name
  source_archive_object = google_storage_bucket_object.this.name
  entry_point           = var.entry_point
  
  event_trigger {
    event_type = "providers/cloud.firestore/eventTypes/document.create"
    resource   = "SupportCase/{caseId}"
  }
}
