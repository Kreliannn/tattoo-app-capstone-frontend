
export interface accountInterfaceInput {
    name: string,
    type: string,
    contact: string,
    username: string,
    password: string,
    profile : string,
    location : {
        long : number,
        lat : number,
    } | null,
}

export interface accountInterface extends accountInterfaceInput {
    _id : string,
}



export interface artistInfoInterfaceInput {
    artist : string,
    bio : string,
    profileImages : {
        type : string,
        fileUrl : string,
        fileType : string
    }[], 
    reviews : {
        client : string,
        comment : string,
        img : string,
        rating :number,
    }[], 
}

export interface artistInfoInterface {
    _id : string,
    artist : accountInterface,
    bio : string,
    profileImages : {
        type : string,
        fileUrl : string,
        fileType : string
    }[], 
    reviews : {
        client : accountInterface,
        comment : string,
        img : string,
        rating :number,
    }[], 
}

export interface artistVerificationInterface {
    _id : string,
    client : accountInterface,
    validId : string
}