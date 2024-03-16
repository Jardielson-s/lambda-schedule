resource "aws_s3_bucket" "s3_send_notification_lambda_handler" {
  bucket        = var.bucket_name
  force_destroy = true
}
