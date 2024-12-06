import { Api } from './api'
import * as user from '../types/user'

export const User = {
  Get: {
    info: async (): Promise<user.IUserInfoResponse> => {
      return await Api.Get(`/users`)
    },
  },
}
