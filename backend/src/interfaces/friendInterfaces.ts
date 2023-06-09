export interface IFriendOps {
    userID : string;
    friendID : string;
}

export interface IFriendRet {
    idArray : Array<string>;
}

export interface IFriendData {
    id ?: string;
    username ?: string;
    email ?: string;
}