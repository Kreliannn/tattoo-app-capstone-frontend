
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