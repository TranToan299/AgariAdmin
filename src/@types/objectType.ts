import { AnyAaaaRecord } from "dns";

export type ObjectType = {
  id?: number | string;
  objectType?: string;
  objectCode?: string | number;
  objectName?: string;
  parent_id?: AnyAaaaRecord;
};
export type ObjectTypeState = {
  brandList: ObjectType[]
};
