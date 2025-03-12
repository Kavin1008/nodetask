const globalErrorHandler = (err, req, res, next) => {
    err.statusCode = err.statusCode ?? 500;
    err.message = err.message ?? "Internal server error";

    res.status(err.statusCode).json({
        status: err.statusCode,
        message: err.message
    })
}   

export default globalErrorHandler