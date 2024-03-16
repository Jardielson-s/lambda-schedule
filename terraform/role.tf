data "aws_iam_policy_document" "assume_role" {
  statement {
    effect = "Allow"
    principals {
      type        = "Service"
      identifiers = ["lambda.amazonaws.com"]
    }
    actions = ["sts:AssumeRole"]
  }
}

resource "aws_iam_role" "iam_role_for_lambda_handler" {
  name               = "${var.lambda_name}_iam_role"
  assume_role_policy = data.aws_iam_policy_document.assume_role.json
}


resource "aws_iam_role_policy" "lambda_handler_iam_role_policy" {
  name = "${var.lambda_name}_iam_role_policy"
  role = aws_iam_role.iam_role_for_lambda_handler.id

  policy = <<EOF
{
"Version": "2012-10-17",
"Statement": [
    {
        "Action": [
            "s3:GetObject"
        ],
        "Effect": "Allow",
        "Resource": "${aws_s3_bucket.s3_send_notification_lambda_handler.arn}/*"
    },
    {
            "Sid": "SpecificTable",
            "Effect": "Allow",
            "Action": [
                "dynamodb:PutItem"
            ],
            "Resource": "${aws_dynamodb_table.basic-dynamodb-table.arn}"
    }
]
}
EOF

  depends_on = [aws_iam_role.iam_role_for_lambda_handler, aws_dynamodb_table.basic-dynamodb-table]
}


resource "aws_iam_policy" "function_logging_policy" {
  name = "${var.lambda_name}-logging-policy"
  policy = jsonencode({
    "Version" : "2012-10-17",
    "Statement" : [
      {
        Action : [
          "logs:CreateLogStream",
          "logs:PutLogEvents"
        ],
        Effect : "Allow",
        Resource : "arn:aws:logs:*:*:*"
      }
    ]
  })
}

resource "aws_iam_role_policy_attachment" "function_logging_policy_attachment" {
  role       = aws_iam_role.iam_role_for_lambda_handler.id
  policy_arn = aws_iam_policy.function_logging_policy.arn
}
