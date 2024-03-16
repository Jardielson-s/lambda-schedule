import { DynamoDBDocument } from "@aws-sdk/lib-dynamodb";
import { DynamoDB } from "@aws-sdk/client-dynamodb";

export const dynamoDB = DynamoDBDocument.from(
  new DynamoDB({
    region: process.env.AWS_REGION,
  })
);
