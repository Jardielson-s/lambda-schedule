import { GetObjectCommand } from "@aws-sdk/client-s3";
import { s3Config } from "../s3.config";

export const s3Commands = (s3: typeof s3Config) => {
  const get = async (params) => {
    const command = new GetObjectCommand(params);
    const object = await s3.send(command);
    const string = await object.Body.transformToString();
    const data = JSON.parse(string);
    return data;
  };

  return { get };
};
