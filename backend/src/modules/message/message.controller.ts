import {Controller, Post, Body, Get, Param} from '@nestjs/common'
import {MessageService} from './message.service'
import {CreateMessageDto} from './message.dto'

@Controller('messages')
export class MessageController {
    constructor(private readonly messageService: MessageService) {}

    @Post()
    createMessage(@Body() message: CreateMessageDto) {
        return this.messageService.create(message)
    }

    @Get(`:id`)
    fetchMessages(@Param() param: {id: string}) {
        return this.messageService.fetchMessages(param.id)
    }
}
