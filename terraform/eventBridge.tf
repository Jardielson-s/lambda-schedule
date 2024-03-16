# resource "aws_cloudwatch_event_rule" "lambda_handler_five_minuetes" {
#   name                = var.lambda_name
#   description         = "This is schedule for ${var.lambda_name} with duration of five minutes"
#   schedule_expression = "rate(5 minutes)"
# }

# resource "aws_cloudwatch_event_target" "lambda_handler_target" {
#   rule       = aws_cloudwatch_event_rule.lambda_handler_five_minuetes.name
#   target_id  = var.lambda_name
#   arn        = aws_lambda_function.lambda_schedule.arn
#   depends_on = [aws_lambda_function.lambda_schedule, aws_cloudwatch_event_rule.lambda_handler_five_minuetes]
# }
