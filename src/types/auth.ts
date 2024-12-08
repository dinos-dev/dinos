import { DefaultResponse } from '.'

/*************************** Domain & DTO ***************************/

/******************************* Form ********************************/

/***************************** Request *****************************/
export interface ISignUpRequest {
  email: string
  userName: string
  authType: 'google' | 'kakao' | 'apple' | 'naver'
}

/***************************** Response *****************************/
export interface ISignUpResponse extends DefaultResponse {
  result: {
    accessToken: string
    refreshToken: string
  }
}
