import { accountInterface } from "./accounts.type";

export interface inventoryInterfaceInput {
    artist : string,
    item : string,
    category : string,
    stocks : number,
}


export interface inventoryInterface {
    _id : string,
    artist : accountInterface,
    item : string,
    category : string,
    stocks : number,
}