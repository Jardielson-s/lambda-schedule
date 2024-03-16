import { beforeAll, describe, expect, test, vitest, afterEach } from "vitest";
import { Repositories } from "../data.repository";
import { DynamoDB } from "@src/shared/__tests__/dynamoDB.config";
import { TRepository } from "@src/shared/interfaces/repository.type";
import { v4 } from "uuid";
import { Data } from "@src/shared/interfaces/data.type";

describe(Repositories.name, () => {
  let repositories: TRepository;
  const data: Data = {
    id: v4(),
    name: "Test " + new Date(),
  };

  beforeAll(() => {
    repositories = Repositories(DynamoDB);
  });

  afterEach(() => {
    vitest.clearAllMocks();
  });
  test("should be defined", () => {
    expect(Repositories).toBeDefined();
  });

  test("should be called put method", async () => {
    const spyPut = vitest
      .spyOn(DynamoDB, "put")
      .mockReturnValue({ promise: () => {} } as any);
    await repositories.put(data);
    expect(spyPut).toBeCalledTimes(1);
  });

  test("should be called update method", async () => {
    const spyUpdate = vitest
      .spyOn(DynamoDB, "update")
      .mockReturnValue({ promise: () => {} } as any);
    await repositories.update(data);
    expect(spyUpdate).toBeCalledTimes(1);
  });
});
