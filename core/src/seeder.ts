import { NestFactory } from '@nestjs/core';
import SeedingModule from './seeder/seeding.module';
import SeedingService from './seeder/seeding.service';

(async function () {
    const app = await NestFactory.create(SeedingModule);
    try {
        const seeder = app.get(SeedingService)

        await seeder.seed()
        
        console.log("Seeding Complete")
    } catch(err) {
        console.error("Seeding Failed")
        throw err
    }
    app.close()
})();
