export interface IUser {
    username : string;
    email : string;
    password : string;
}

export interface IRegister {
    username : string;
    email : string;
    password : string;
    confirmPassword : string;
}

export interface ILogin {
    email : string;
    password : string;
}

export interface IFriendData{
    username ?: string;
    email ?: string;
}

export interface IAddUser {
    username ?: string;
    email ?: string;
    id ?: number|string;
    friends ?: Array<string>;
}