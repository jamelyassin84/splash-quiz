import React from 'react'

export default function NewChat() {
    return (
        <div className="flex items-center px-2 py-1 bg-chat-footer">
            <input
                type="text"
                className="w-full px-3 py-3 mr-4 border rounded-lg border-default-border bg-input"
            />

            <button className="px-10 py-3 my-3 font-bold text-center rounded-md bg-gradient-to-r from-pink to-orange md:hover:brightness-150">
                Start
            </button>
        </div>
    )
}
