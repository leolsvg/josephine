terraform {
  required_providers {
    google = {
      source  = "hashicorp/google"
      version = "7.6.0"
    }
  }
}

variable "project_id" {
  description = "Google Cloud project ID"
}

provider "google" {
  project               = var.project_id
  billing_project       = var.project_id
  region                = "europe-west9"
  user_project_override = true
}

resource "google_project_service" "business_api" {
  service = "mybusinessbusinessinformation.googleapis.com"
}

resource "google_project_service" "places_api" {
  service = "places.googleapis.com"
}

resource "google_apikeys_key" "maps_api_key" {
  name         = "maps-api-key"
  display_name = "Maps API Key"
  restrictions {
    api_targets {
      service = "places.googleapis.com"
    }
  }
}

