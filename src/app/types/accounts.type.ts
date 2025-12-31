
export interface accountInterfaceInput {
    name: string,
    type: string,
    contact: string,
    username: string,
    password: string,
    profile : string
}

export interface accountInterface extends accountInterfaceInput {
    _id : string,
}



export interface artistInfoInterfaceInput {
    artist : string,
    bio : string,
    profileImages : {
        type : string,
        img : string,
    }[], 
    location : {
        long : number,
        lat : number,
    } | null,
}

export interface artistInfoInterface {
    _id : string,
    artist : accountInterface,
    bio : string,
    profileImages : {
        type : string,
        img : string,
    }[], 
    location : {
        long : number,
        lat : number,
    } | null,
}