import { accountInterface } from "./accounts.type";
import { postInterface } from "./post.type";

export interface bookingInterfaceInput {
    artist : string,
    client : string,  
    post : string,  
    RemainingSessions : number,
    date : string,
    time : string[]
    duration : number,
    status : string
}
 
export interface bookingInterface{
    _id : string,
    artist : accountInterface,
    client : accountInterface,  
    post : postInterface,  
    RemainingSessions : number,
    date : string,
    time : string[]
    duration : number,
    status : string
}
 
