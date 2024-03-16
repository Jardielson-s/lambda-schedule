import { describe, expect, test } from "vitest";
import { v4 } from "uuid";
import { Data } from "@src/shared/interfaces/data.type";
import { handler } from "../handler";
import { lambdaContext } from "@src/shared/__tests__/lambda.config";

describe(handler.name, () => {
  let handerExecute;
  const event = {
    Records: [
      {
        eventVersion: "2.0",
        eventSource: "aws:s3",
        awsRegion: "us-east-1",
        eventTime: "1970-01-01T00:00:00.000Z",
        eventName: "ObjectCreated:Put",
        userIdentity: {
          principalId: "EXAMPLE",
        },
        requestParameters: {
          sourceIPAddress: "127.0.0.1",
        },
        responseElements: {
          "x-amz-request-id": "EXAMPLE123456789",
          "x-amz-id-2":
            "EXAMPLE123/5678abcdefghijklambdaisawesome/mnopqrstuvwxyzABCDEFGH",
        },
        s3: {
          s3SchemaVersion: "1.0",
          configurationId: "testConfigRule",
          bucket: {
            name: "my-bucket",
            ownerIdentity: {
              principalId: "EXAMPLE",
            },
            arn: "arn:aws:s3:::my-bucket",
          },
          object: {
            key: "test%2Fkey",
            size: 1024,
            eTag: "0123456789abcdef0123456789abcdef",
            sequencer: "0A1B2C3D4E5F678901",
          },
        },
      },
    ],
  };
  const data: Data = {
    id: v4(),
    name: "Test " + new Date(),
  };

  test("should be defined", () => {
    expect(handler).toBeDefined();
  });

  // test("should be called put method", async () => {
  //   await handler({}, lambdaContext, () => {});
  // });
});
