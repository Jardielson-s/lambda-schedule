resource "aws_cloudwatch_log_group" "lambda_log_group" {
  name              = "/aws/lambda/${aws_lambda_function.lambda_schedule.function_name}"
  retention_in_days = 7
  lifecycle {
    prevent_destroy = false
  }
  depends_on = [aws_lambda_function.lambda_schedule]
}
