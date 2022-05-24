"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const core_1 = require("@nestjs/core");
const cookieParser = require("cookie-parser");
const helmet_1 = require("helmet");
const app_module_1 = require("./app.module");
const response_interceptor_1 = require("./common/interceptors/response.interceptor");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const config = app.get(config_1.ConfigService);
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        transform: true
    }));
    app.useGlobalInterceptors(new response_interceptor_1.ResponseInterceptor());
    app.use((0, helmet_1.default)());
    app
        .use((req, res, next) => {
        res.header("x-powered-by", "lxsky");
        next();
    })
        .use(cookieParser());
    app
        .enableVersioning({
        type: common_1.VersioningType.URI
    })
        .enableCors({
        credentials: true,
        origin: config.get("sys.frontendUrl"),
    });
    await app.listen(3000);
}
bootstrap();
//# sourceMappingURL=main.js.map