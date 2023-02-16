terraform {
  backend "gcs" {
    bucket = "1ed176c79fae545f-bucket-tfstate"
    prefix = "get-customer-case"
  }

  required_providers {
    google = {
      source  = "hashicorp/google"
      version = "4.52.0"
    }
    archive = {
      source  = "hashicorp/archive"
      version = "2.3.0"
    }
  }
}

provider "google" {
  project = "modern-bolt-377512"
  region  = "europe-west1"
  zone    = "europe-west1-b"
}