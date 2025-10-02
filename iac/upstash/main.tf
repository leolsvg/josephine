terraform {
  required_providers {
    upstash = {
      source  = "upstash/upstash"
      version = "2.1.0"
    }
  }
}

provider "upstash" {
  email   = var.upstash_email
  api_key = var.upstash_api_key
}

resource "upstash_redis_database" "josephineDB" {
  database_name  = "Josephine"
  primary_region = "eu-central-1"
  region         = "global"
  tls            = true
}
