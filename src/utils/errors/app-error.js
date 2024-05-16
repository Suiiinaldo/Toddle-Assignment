class AppError extends Error{
    constructor(message,statusCodes){
        super(message);
        this.statusCodes = statusCodes;
        this.explanation = message;
    }
}

module.exports = AppError;