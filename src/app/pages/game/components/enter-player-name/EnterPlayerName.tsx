import React from 'react'

export default function EnterPlayerName() {
    return (
        <div className="flex flex-col items-center border border-default-border bg-card-bg rounded-lg min-h-[600px] h-full  px-10">
            <div className="my-20 text-3xl font-bold text-secondary">
                Welcome
            </div>

            <div className="mb-3 text-sm text-secondary/80">
                Please Insert Your Name
            </div>

            <input
                type="text"
                className="w-full px-3 py-3 border rounded-lg border-default-border bg-input"
            />

            {/* <button className="w-full py-3 my-3 font-bold text-center rounded-md bg-disabled">
                Accept
            </button> */}

            <button className="w-full py-3 my-3 font-bold text-center rounded-md bg-gradient-to-r from-pink to-orange md:hover:brightness-150">
                Accept
            </button>
        </div>
    )
}
