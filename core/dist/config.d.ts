declare const _default: () => {
    db: {
        sql: {
            type: string;
            host: string;
            port: number;
            username: string;
            password: string;
            name: string;
        };
        redis: {
            host: string;
            port: number;
            password: string;
        };
    };
    sys: {
        frontendUrl: string;
    };
    security: {
        lockOutTime: number;
        maxAttempts: number;
    };
    oss: {
        region: string;
        host: string;
        accessId: string;
        accessKey: string;
        bucket: string;
        expire: number;
    };
};
export default _default;
