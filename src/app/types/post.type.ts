import { accountInterface } from "./accounts.type"

export interface postInterfaceInput {
    artist : string,
    postImg : string,
    tags : string[],
    category : string,
    estimatedTime : string,
    sessions :number,
    reviews : {
        client : string,
        comment : string,
        img : string,
        rating :number,
    }[], 
}

export interface postInterface  {
    _id : string,
    artist : accountInterface
    postImg : string,
    tags : string[],
    category : string,
    estimatedTime : string,
    sessions :number,
    reviews : {
        client : string,
        comment : string,
        img : string,
        rating :number,
    }[], 
}