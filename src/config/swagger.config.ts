import { INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export function initSwagger(app: INestApplication<any>) {
  const configService = app.get(ConfigService);

  const swaggerTitle = configService.get('SWAGGER_TITLE');
  const swaggerDescription = configService.get('SWAGGER_DESCRIPTION');
  const swaggerVersion = configService.get('SWAGGER_VERSION');
  const swaggerPath = configService.get('SWAGGER_PATH');

  const config = new DocumentBuilder()
    .setTitle(swaggerTitle)
    .setDescription(swaggerDescription)
    .setVersion(swaggerVersion)
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(swaggerPath, app, document);
}
