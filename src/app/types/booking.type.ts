import { accountInterface } from "./accounts.type";
import { postInterface } from "./post.type";

export interface bookingInterfaceInput {
    artist : string,
    client : string,  
    tattooImg : string,
    sessions : number[],  
    session : number,
    date : string,
    time : string[]
    duration : number,
    status : string
}
 
export interface bookingInterface{
    _id : string,
    artist : accountInterface,
    client : accountInterface,  
    tattooImg : string,
    sessions : number[],  
    session : number,
    date : string,
    time : string[]
    duration : number,
    status : string
}
 
