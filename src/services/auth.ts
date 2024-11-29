import { Api } from './api'
import { ISignUp } from '../types/auth'

// export const fetchFreeBudgetList = async (affiliation: string, quarterIdx: number, page: number) =>
//     Api.Get<any>('/fee-management/free-budget/list/:affiliation/:quarterIdx', {
//         pathParams: { affiliation, quarterIdx },
//         queryParams: { page },
//     }
// )

////////////

export const Auth = {
    Get: {
        //
    },
    Post: {
        signUp: async (body: ISignUp) => {
            return await Api.Post(`/auth/social-login`, { body })
        },
    },
}
