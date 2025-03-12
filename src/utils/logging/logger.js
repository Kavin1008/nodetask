import winston from "winston";
import DailyRotateFile from "winston-daily-rotate-file";


const enumerateError = winston.format((info) => {
    if(info instanceof Error)
    {
        Object.assign(info, {message: info.stack})
    }

    return info
})

const consoleLogFormat = winston.format.combine(
    winston.format.colorize(),
    winston.format.printf(({level, message, timestamp}) => {
        return `${level}: ${message}`
    })
)


const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        enumerateError(),
        winston.format.colorize(),
        winston.format.splat(),
        winston.format.printf(({level, message}) => `${level}: ${message}`)
    ),
    transports:[
        new winston.transports.Console({
            format: consoleLogFormat
        }),
        new DailyRotateFile({
            filename: 'logs/application-%DATE%.log',
            datePattern: 'YYYY-MM-DD',
            maxSize: '20m',
            maxFiles: '14d' 
        })
    ]
})

export default logger