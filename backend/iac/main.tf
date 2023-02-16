terraform {
  required_providers {
    google = {
      source = "hashicorp/google"
      version = "4.52.0"
    }
  }
}

provider "google" {
  project = "modern-bolt-377512"
  region  = "europe-west1"
  zone    = "europe-west1-b"
}

resource "random_id" "bucket_prefix" {
  byte_length = 8
}

resource "google_storage_bucket" "default" {
  name          = "${random_id.bucket_prefix.hex}-bucket-tfstate"
  force_destroy = false
  location      = "EUROPE-WEST1"
  storage_class = "STANDARD"
  versioning {
    enabled = true
  }
}