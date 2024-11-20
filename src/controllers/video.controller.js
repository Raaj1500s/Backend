import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from "../utils/apiError.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { Video } from "../models/video.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const getAllVideo = asyncHandler(async (req,res) => {

})

const publishAVideo = asyncHandler(async (req,res) => {

    const {title, description} = req.body;
    if ([title, description].some((field) => field?.trim() === "")){
        throw new ApiError(404, "All fields are required")
    }
    // console.log(req.files);
    
    const videoFileLocalPath = req.files?.videoFile[0]?.path
    const thumbnailLocalPath = req.files?.thumbnail[0]?.path

    if (!videoFileLocalPath){
        throw new ApiError(404, "video file is required")
    }

    const videoFile = await uploadOnCloudinary(videoFileLocalPath)
    const thumbnail = await uploadOnCloudinary(thumbnailLocalPath)

    if (!videoFile){
        throw new ApiError(404, "video file is required")
    }

    const video = await Video.create({
        title,
        description,
        videoFile : videoFile.url,
            // public_id : videoFile.public_id
        thumbnail : thumbnail?.url || "",
        duration : videoFile.duration,
        owner : req.user?._id
    })

    const videoUploded = await Video.findById(video._id)

    if (!videoUploded)
    {
        throw new ApiError(404, "An error occurred while uploading video")
    }

    return res
    .status(200)
    .json(
        new ApiResponse(200, videoUploded, "video uploaded successfully")
    )
})

export {publishAVideo}