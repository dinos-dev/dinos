import { Api } from './api'
import * as auth from '../types/auth'
import { DefaultResponse } from '../types'

export const AuthRequest = {
  Get: {
    //
  },
  Post: {
    signUp: async (body: auth.ISignUpRequest): Promise<auth.ISignUpResponse> => {
      return await Api.Post(`/auth/social-login`, { body })
    },
    logout: async (): Promise<DefaultResponse> => {
      return await Api.Post(`/auth/logout`)
    },
  },
}
