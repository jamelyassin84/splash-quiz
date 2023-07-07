import {NestFactory} from '@nestjs/core'
import {AppModule} from './app.module'

async function bootstrap() {
    const app = await NestFactory.create(AppModule)

    app.setGlobalPrefix('api')

    app.enableCors({
        origin: 'http://localhost:3000',
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        preflightContinue: false,
        optionsSuccessStatus: 200,
        credentials: true,
        allowedHeaders:
            'Origin,X-Requested-With,Content-Type,Accept,Authorization',
    })

    await app.listen(8000)
}
bootstrap()
