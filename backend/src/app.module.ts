import {Module} from '@nestjs/common'
import {AppController} from './app.controller'
import {AppService} from './app.service'
import {BetModule} from './modules/bet/bet.module'
import {MessageModule} from './modules/message/message.module'
import {PlayerModule} from './modules/player/player.module'
import {RoundModule} from './modules/round/round.module'
import {TypeOrmModule} from '@nestjs/typeorm'
import {PlayerEntity} from './modules/player/player.entity'
import {MessageEntity} from './modules/message/message.entity'
import {RoundEntity} from './modules/round/round.entity'

@Module({
    imports: [
        BetModule,
        MessageModule,
        PlayerModule,
        RoundModule,
        TypeOrmModule.forRoot({
            type: 'mysql',
            host: 'localhost',
            port: 3306,
            username: 'root',
            password: '',
            entities: [PlayerEntity, MessageEntity, RoundEntity],
            database: 'multiplayer_mania',
            synchronize: true,
        }),
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
