import {Message} from '@/app/core/models/message.model'
import {messageSelector} from '@/app/core/store/message/message.selectors'
import React from 'react'
import {useSelector} from 'react-redux'

export default function ChatMessages() {
    const messages = useSelector(messageSelector)

    return (
        <div className="flex flex-col px-5 h-[200px] overflow-y-auto overflow-x-hidden">
            {messages.map((message: any, i: number) => (
                <div className="flex items-start mb-3" key={i}>
                    <div
                        className={`whitespace-nowrap ${
                            i % 2 === 0 ? 'text-orange' : 'text-pink'
                        }`}
                    >
                        {message.player.name}
                    </div>
                    <div
                        className={`p-0.5 ml-3 text-white   max-w-full rounded-lg ${
                            i % 2 === 0 ? 'bg-secondary' : 'bg-gray-400'
                        } text-xs px-2 break-words`}
                        style={{wordBreak: 'break-word'}}
                    >
                        {message.content}
                    </div>
                </div>
            ))}
        </div>
    )
}
