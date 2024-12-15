import { Api } from './api'
import * as user from '../types/user'
import { DefaultResponse } from '../types'

export const UserRequest = {
  Get: {
    info: async (): Promise<user.IUserInfoResponse> => {
      return await Api.Get(`/users`)
    },
  },
  Delete: {
    withdrawal: async (): Promise<DefaultResponse> => {
      return await Api.Delete(`/users`)
    },
  },
}
