import { Portfolio } from "./Portfolio"
import { UserInformation } from "./User"

export type UsernameAction = {
    type: string,
    payload: string
}

export type State = {
    user?: UserInformation,
    portfolios?: Portfolio[]
}

