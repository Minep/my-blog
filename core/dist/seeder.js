"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const seeding_module_1 = require("./seeder/seeding.module");
const seeding_service_1 = require("./seeder/seeding.service");
(async function () {
    const app = await core_1.NestFactory.create(seeding_module_1.default);
    try {
        const seeder = app.get(seeding_service_1.default);
        await seeder.seed();
        console.log("Seeding Complete");
    }
    catch (err) {
        console.error("Seeding Failed");
        throw err;
    }
    app.close();
})();
//# sourceMappingURL=seeder.js.map