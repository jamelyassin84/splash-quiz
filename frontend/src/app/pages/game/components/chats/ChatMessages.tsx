import {Message} from '@/app/core/models/message.model'
import {MessageActions} from '@/app/core/store/message/message.actions'
import {messageSelector} from '@/app/core/store/message/message.selectors'
import {roundSelector} from '@/app/core/store/round/round.selectors'
import {socket} from '@/app/socket'
import React, {useEffect, useRef} from 'react'
import {useSelector, useDispatch} from 'react-redux'

export default function ChatMessages() {
    const dispatch = useDispatch()
    const round = useSelector(roundSelector)
    const messages = useSelector(messageSelector)
    const messagesContainerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (round) {
            socket.connect()

            socket.on(`messageCreated:${round.id}`, handleNewMessage)

            return () => {
                socket.off(`messageCreated:${round.id}`, handleNewMessage)
                socket.disconnect()
            }
        }
    }, [round])

    useEffect(() => {
        if (messagesContainerRef.current) {
            messagesContainerRef.current.scrollTop =
                messagesContainerRef.current.scrollHeight
        }
    }, [messages])

    const handleNewMessage = (message: Message) => {
        dispatch(MessageActions.upsert(message))
    }

    return (
        <div
            className="flex flex-col px-5 h-[200px] overflow-y-auto overflow-x-hidden"
            ref={messagesContainerRef}
        >
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
                        className={`p-0.5 ml-3 text-white max-w-full rounded-lg ${
                            i % 2 === 0 ? 'bg-secondary' : 'bg-gray-400'
                        } text-xs px-2 break-words`}
                        style={{
                            wordBreak: 'break-word',
                            whiteSpace: 'pre-wrap',
                        }}
                    >
                        {message.content}
                    </div>
                </div>
            ))}
        </div>
    )
}
