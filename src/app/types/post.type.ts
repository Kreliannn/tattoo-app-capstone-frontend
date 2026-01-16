import { accountInterface } from "./accounts.type"

export interface postInterfaceInput {
    account : string,
    postImg : string,
    tags : string[],
    category : string,
    sessions :number[],
    price : number,
    itemUsed : {
        itemId : string,
        item : string,
        qty : number,
    }[]
}

export interface postInterface  {
    _id : string,
    account : accountInterface
    postImg : string,
    tags : string[],
    category : string,
    sessions :number[],
    price : number,
    itemUsed : {
        itemId : string,
        item : string,
        qty : number,
    }[]
}