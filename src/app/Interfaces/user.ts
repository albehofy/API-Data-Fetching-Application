import { Address } from "./address"
import { Company } from "./company"

export interface User {
    address:Address,
    company: Company,
    email:string
    id:1
    name:string,
    phone:string,
    username:string,
    website: string
}
