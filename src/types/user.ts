import { DefaultResponse } from '.'

/*************************** Domain & DTO ***************************/
export interface IUserInfo {
    id: string | number
    email: string
    userName: string
    authType: string
    isActive: boolean
}

/******************************* Form ********************************/

/***************************** Request *****************************/
export interface IUserInfoRequest {
    id: string | number
}

/***************************** Response *****************************/
export interface IUserInfoResponse extends DefaultResponse {
    result: IUserInfo
}
