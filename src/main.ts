import { NestFactory } from "@nestjs/core";
import { ConfigService } from "@nestjs/config";

import { AppModule } from "./app.module";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { globalValidationPipe } from "./common/pipes/validation.pipe";
import { TakeAwaitExceptionFilter } from "./common/exceptions/take-await-exception-filter";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(globalValidationPipe);
  app.useGlobalFilters(new TakeAwaitExceptionFilter());

  const configService = app.get(ConfigService);

  const config = new DocumentBuilder()
    .setTitle("TakeAwait")
    .setDescription("handle restaurants orders")
    .setVersion("1.0")
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api-docs", app, document);

  await app.listen(configService.get<number>("port"));
}
bootstrap();
