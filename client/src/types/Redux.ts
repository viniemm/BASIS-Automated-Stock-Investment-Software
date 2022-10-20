import { Portfolio } from "./Portfolio"
import { Auth, User } from "./User"

export type UsernameAction = {
    type: string,
    payload: any
}

export type State = {
    auth: Auth
}

