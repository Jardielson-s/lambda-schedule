import { Data } from "./data.type";

export type TRepository = {
  put: (data: Data) => Promise<any>;
  update: (data: Data) => Promise<any>;
};
