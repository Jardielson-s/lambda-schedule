import { DynamoDBDocument } from "@aws-sdk/lib-dynamodb";
import { Data } from "@src/shared/interfaces/data.type";
import { TRepository } from "@src/shared/interfaces/repository.type";

const Repositories = (
  dynamoDB: Pick<DynamoDBDocument, "put" | "update">
): TRepository => {
  const tableName = String(process.env.DYNAMODB_TABLE_NAME);

  const put = async (data: Data) => {
    return await dynamoDB.put({
      TableName: tableName,
      Item: data,
    });
  };

  const update = async (data: Data) => {
    return await dynamoDB.update({
      TableName: tableName,
      Key: { id: data.id },
      UpdateExpression: "set name = :r",
      ExpressionAttributeValues: {
        ":r": data.name,
      },
    });
  };

  return { put, update };
};

export { Repositories };
