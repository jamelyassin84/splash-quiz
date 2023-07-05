import React from 'react'

export default function ChatMessages() {
    return (
        <div className="flex flex-col px-5 h-[200px] overflow-y-auto overflow-x-hidden">
            {[1, 2, 3, 4, 5].map((v, i) => (
                <div
                    className="flex items-center mb-3 whitespace-nowrap"
                    key={i}
                >
                    <div
                        className={`whitespace-nowrap ${
                            i % 2 === 0 ? 'text-orange' : 'text-pink'
                        }`}
                    >
                        CPU {v}:
                    </div>
                    <div
                        className={`p-0.5 ml-3 text-white w-full max-w-full rounded-lg ${
                            i % 2 === 0 ? 'bg-secondary' : 'bg-gray-400'
                        } text-xs px-2 whitespace-normal`}
                    >
                        Hi Guys asd asd sad asdsad asd sad sad sad Hi Guys Hi
                        Guys asd asd sad asdsad asd sad sad sad Hi Guys
                    </div>
                </div>
            ))}
        </div>
    )
}
