import { accountInterface } from "./accounts.type";

export interface inventoryInterfaceInput {
    account : string,
    item : string,
    category : string,
    stocks : number,
}


export interface inventoryInterface {
    _id : string,
    account : accountInterface,
    item : string,
    category : string,
    stocks : number,
}