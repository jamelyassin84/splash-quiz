import React, {lazy} from 'react'
import ChatMessages from './ChatMessages'
import NewChat from './NewChat'
import Image from 'next/image'
import dynamic from 'next/dynamic'

export default function ChatBox() {
    return (
        <div className="flex flex-col w-full mt-5">
            <div className="flex items-end w-full">
                <Image
                    alt=""
                    height={25}
                    className="mr-2"
                    src={require('../../../../../../public/assets/icons/chat.png')}
                />
                <div className="text-xl text-white">Chats</div>
            </div>

            <div className="border rounded-lg border-default-border bg-card-bg min-h-[250px] mt-2 pt-10">
                <ChatMessages />
                <NewChat />
            </div>
        </div>
    )
}
