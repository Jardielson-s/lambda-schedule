import { vitest } from "vitest";
import { TRepository } from "../interfaces/repository.type";

const DynamoDB: Pick<TRepository, "put" | "update"> = {
  put: vitest.fn(),
  update: vitest.fn(),
};

export { DynamoDB };
