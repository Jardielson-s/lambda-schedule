data "archive_file" "lambda_file" {
  type = "zip"
  # source_file = var.path_lambda
  output_path = var.lambda_outpath
  source_dir  = var.lambda_source_dir
}

data "archive_file" "lambda_layers" {
  type        = "zip"
  source_dir  = var.lambda_laryer_source_dir
  output_path = var.lambda_layer_outpath
  depends_on  = [null_resource.dependencies]
}

# Provisioner to install dependencies in lambda package before upload it.
resource "null_resource" "dependencies" {

  triggers = {
    updated_at = timestamp()
  }

  provisioner "local-exec" {
    command = <<EOF
    npm i
    EOF

    working_dir = var.lambda_laryer_source_dir
  }
}

resource "aws_lambda_layer_version" "layer_to_lambda" {
  # compatible_architectures = [var.node_version]
  compatible_runtimes = [var.node_version]
  layer_name          = var.lambda_name
  filename            = data.archive_file.lambda_layers.output_path
}

resource "aws_lambda_function" "lambda_schedule" {
  function_name    = var.lambda_name
  role             = aws_iam_role.iam_role_for_lambda_handler.arn
  handler          = "infra/aws/lambda/handler.handler"
  filename         = data.archive_file.lambda_file.output_path
  source_code_hash = data.archive_file.lambda_file.output_base64sha512
  runtime          = var.node_version
  depends_on       = [aws_iam_role.iam_role_for_lambda_handler, aws_s3_bucket.s3_send_notification_lambda_handler, aws_lambda_layer_version.layer_to_lambda]
  timeout          = var.timeout
  memory_size      = var.memory_size
  layers           = [aws_lambda_layer_version.layer_to_lambda.arn]
  environment {
    variables = {
      DYNAMODB_TABLE_NAME = var.dynamodb_name
    }
  }
}


resource "aws_s3_bucket_notification" "otification_from_s3_to_lambda_handler" {
  bucket = aws_s3_bucket.s3_send_notification_lambda_handler.bucket
  lambda_function {
    lambda_function_arn = aws_lambda_function.lambda_schedule.arn
    events              = ["s3:ObjectCreated:*"]
  }

}

resource "aws_lambda_permission" "lambda_permission_to_invokate" {
  statement_id  = "AllowS3Invoke"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.lambda_schedule.function_name
  principal     = "s3.amazonaws.com"
  source_arn    = "arn:aws:s3:::${aws_s3_bucket.s3_send_notification_lambda_handler.bucket}"
}
