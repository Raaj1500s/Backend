const asyncHandler = (requestHandler) => {
    return (req,res,next) => {
        Promise.resolve(requestHandler(req,res,next)).catch((err) => next(err));
    }
}

export {asyncHandler}

/*
const asyncHandlers = (func) => async (req,res,next) => {
    try {
        await func(req,res,next);
    } catch (error) {
        console.log(error);
        res.status(error.statusCode).json(
            {
                success : false,
                message: error.message
            }
        );
        
    }
}
*/