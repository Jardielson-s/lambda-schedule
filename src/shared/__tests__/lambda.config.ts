import { Context } from "aws-lambda";

export const lambdaContext: Context = {
  callbackWaitsForEmptyEventLoop: false,
  functionName: "",
  functionVersion: "",
  invokedFunctionArn: "",
  memoryLimitInMB: "",
  awsRequestId: "",
  logGroupName: "",
  logStreamName: "",
  getRemainingTimeInMillis: function (): number {
    throw new Error("Function not implemented.");
  },
  done: function (_error?: Error, _result?: any): void {
    throw new Error("Function not implemented.");
  },
  fail: function (_error: string | Error): void {
    throw new Error("Function not implemented.");
  },
  succeed: function (_messageOrObject: any): void {
    throw new Error("Function not implemented.");
  },
};
