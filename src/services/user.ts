import { Api } from './api'
import * as user from '../types/user'

export const UserRequest = {
  Get: {
    info: async (): Promise<user.IUserInfoResponse> => {
      return await Api.Get(`/users`)
    },
  },
}
