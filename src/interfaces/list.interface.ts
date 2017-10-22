import { IListMember } from "./list-member.interface";
import {IContact} from "./contacts.interface";

export interface IList {
  id: number;
  name: string;
  contacts: Array<IContact>;
}
