"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
async function bootstrap() {
    const logger = new common_1.Logger('Bootstrap');
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors({
        origin: true,
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept'],
    });
    app.setGlobalPrefix('api');
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: false,
        transform: true,
    }));
    const config = new swagger_1.DocumentBuilder()
        .setTitle('Krishna Textiles Enterprise API')
        .setDescription('Complete enterprise backend services for Krishna Textiles: User Session Management, In-Memory Cache Layer, Inventory Tracking, Order Workflow, CRM & Analytics.')
        .setVersion('1.0.0')
        .addBearerAuth()
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api/docs', app, document);
    const port = process.env.PORT || 4000;
    await app.listen(port);
    logger.log(`🚀 Krishna Textiles Backend running on http://localhost:${port}/api`);
    logger.log(`📚 Swagger Documentation accessible at http://localhost:${port}/api/docs`);
}
bootstrap();
//# sourceMappingURL=main.js.map