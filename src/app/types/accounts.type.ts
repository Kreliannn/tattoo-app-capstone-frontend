

export interface accountInterfaceInput {
    name: string,
    type: string,
    contact: string,
    email: string,
    password: string,
    profile  :string,
    location?: {
        lat?: number | null
        long?: number | null
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
    bussiness : string,
    artists : {
        artist : accountInterface,
        commision : number
    }[],
    employees : {
        employee : accountInterface,
    }[],
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

export interface bussinessInfoInterface {
    _id : string,
    bio : string,
    bussiness : accountInterface,
    artists : {
        artist : accountInterface,
        commision : number
    }[],
    employees : {
        employee : accountInterface,
    }[],
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

export interface artistApplicationInterfaceInput {
    artist : string,
    bussiness : string,
    date :  string,
    time : string
}

export interface artistApplicationInterface {
    _id : string,
    artist : accountInterface,
    bussiness : accountInterface,
    date :  string,
    time : string
}


export interface employeeInterfaceInput {
    account : string,
    bussiness : string,
    email : string,
    restrictions : string[]
}


export interface employeeInterface {
    _id : string,
    account : accountInterface,
    bussiness : accountInterface,
    email : string,
    restrictions : string[]
}
