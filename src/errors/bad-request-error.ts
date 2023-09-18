import { ApplicationError } from "@/protocols";

export function badRequestError():ApplicationError{
    return{
        name:"BadRequestError",
        message:"The server cannot or will not process the request due to something that is perceived to be a client error."
    }
}