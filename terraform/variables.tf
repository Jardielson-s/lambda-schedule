variable "lambda_name" {
  type    = string
  default = "lambda-schedule"
}

variable "node_version" {
  type    = string
  default = "nodejs18.x"
}


variable "path_lambda" {
  type    = string
  default = "../dist/src/infra/aws/lambda/handler.js"
}

variable "lambda_outpath" {
  type    = string
  default = "lambda.zip"
}

variable "lambda_source_dir" {

}
variable "timeout" {
  type    = number
  default = 120
}

variable "memory_size" {
  type    = number
  default = 1028
}

variable "bucket_name" {
  type    = string
  default = "event-to-lambda"
}


variable "dynamodb_name" {
  type    = string
  default = "dynamo_name"
}

variable "lambda_laryer_source_dir" {
  type = string
}

variable "lambda_layer_outpath" {
  type = string
}
