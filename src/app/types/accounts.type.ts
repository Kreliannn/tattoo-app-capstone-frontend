

export interface accountInterfaceInput {
    name: string,
    type: string,
    contact: string,
    email: string,
    password: string,
    profile  :string,
    location : {
        lat?: number 
        long?: number 
    } | null

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
        fileType : string,
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
        fileType : string,
    }[], 
    reviews : {
        client : accountInterface,
        comment : string,
        img : string,
        rating :number,
    }[], 
}

export interface bussinessInfoInterfaceInput {
    bio : string,
    artist : string,
    employees : string[],
    profileImages : {
        type : string,
        fileUrl : string,
        fileType : string
    }[],
}

export interface bussinessInfoInterface {
    bio : string,
    artist : accountInterface,
    employees : accountInterface[],
    profileImages : {
        type : string,
        fileUrl : string,
        fileType : string
    }[],
}



    
export interface artistVerificationInterfaceInput {
    client : string,
    validId : string,
    bussinessPermit : string | null,
    type : string
}

export interface artistVerificationInterface {
    _id : string,
    client : accountInterface,
    validId : string,
    bussinessPermit : string | null,
    type : string
}