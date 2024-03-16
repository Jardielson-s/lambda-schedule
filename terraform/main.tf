terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = ">= 5.0.0"
    }
  }
  backend "s3" {
    bucket = "terraform-state-ecs-bucket"
    region = "us-east-1"
    key    = "lambda-handler"
  }
}

provider "aws" {}
