// import "dotenv/config";
import { Handler, Context } from "aws-lambda";
import { Repositories } from "@src/infra/aws/database/repositories/data.repository";
import { dynamoDB } from "../database/config/dynamodb.config";
import { s3Config } from "../s3/s3.config";
import { randomUUID } from "crypto";
import { s3Commands } from "../s3/services/s3-commands";

export const handler: Handler = async (event, _context: Context) => {
  const bucket = event.Records[0].s3.bucket.name;
  const key = decodeURIComponent(
    event.Records[0].s3.object.key.replace(/\+/g, " ")
  );
  const params = {
    Bucket: bucket,
    Key: key,
  };
  try {
    const data = await s3Commands(s3Config).get(params);
    for (const item of data) {
      if (item["id"]) {
        await Repositories(dynamoDB).update(item);
      } else {
        item["id"] = randomUUID();
        await Repositories(dynamoDB).put(item);
      }
    }
  } catch (err) {
    const message = `Error: ${err}`;
    console.log(message);
  }
};
