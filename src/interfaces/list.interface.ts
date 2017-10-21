import {IListMember} from "./list-member.interface";

export interface IList {
  name: string;
  members: Array<IListMember>;
}
