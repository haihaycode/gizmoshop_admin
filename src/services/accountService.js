import { HOST } from "@/api/config";

export const loadImageAccount = (imageName) => {
    return `${HOST}/api/public/image/load/account/${imageName}`
}