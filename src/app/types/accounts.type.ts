
export interface accountInterfaceInput {
    name: string,
    type: string,
    contact: string,
    username: string,
    password: string,
}

export interface accountInterface extends accountInterfaceInput {
    _id : string,
}