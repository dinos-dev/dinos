import { Api } from './api'
import * as auth from '../types/auth'

export const Auth = {
  Get: {
    //
  },
  Post: {
    signUp: async (body: auth.ISignUpRequest): Promise<auth.ISignUpResponse> => {
      return await Api.Post(`/auth/social-login`, { body })
    },
  },
}
