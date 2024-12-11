import { HOST } from "@/api/config";

export const loadImageAccount = (imageName) => {
    return `${HOST}/api/public/image/load/account/${imageName}`
}

export const loadImage = (type, imageName) => {
    return `${HOST}/api/public/image/load/${type}/${imageName}`
}