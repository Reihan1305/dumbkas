import {v2 as cloudinary} from "cloudinary"

cloudinary.config({
    cloud_name:process.env.CLOUD_NAME,
    api_secret:process.env.API_SECRET,
    api_key:process.env.API_KEY
})

export default cloudinary