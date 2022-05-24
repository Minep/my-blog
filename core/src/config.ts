export default () => ({
    db: {
        sql: {
            type: process.env["DB_SQL_TYPE"] || "mariadb",
            host: process.env["DB_SQL_HOST"],
            port: parseInt(process.env["DB_SQL_PORT"]) || 3306,
            username: process.env["DB_SQL_USER_NAME"],
            password: process.env["DB_SQL_PASSWORD"],
            name: process.env["DB_SQL_APP_DB"]
        },
        redis: {
            host: process.env["DB_REDIS_HOST"],
            port: parseInt(process.env["DB_REDIS_PORT"]) || 6379,
            password: process.env["DB_REDIS_PASSWORD"] || ""
        }
    },
    sys: {
        frontendUrl: process.env["SYS_FRONTEND_URL"]
    },
    security: {
        lockOutTime: 5,
        maxAttempts: 5,
        sessionExpire: 1800,
        refreshExpire: 3600
    },
    oss: {
        region: process.env["OSS_REGION"],
        host: process.env["OSS_HOST"],
        accessId: process.env["OSS_ACCESS_ID"],
        accessKey: process.env["OSS_ACCESS_KEY"],
        bucket: process.env["OSS_BUCKET"],
        expire: parseInt(process.env["OSS_EXPIRE"] ?? "60"),
    }
})