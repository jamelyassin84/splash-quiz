'use client'

import React, {useState} from 'react'

export default function PointConfiguration() {
    const [points, setPoints] = useState(50)

    const handleIncrement = () => {
        setPoints(points + 25)
    }

    const handleDecrement = () => {
        if (points > 25) {
            setPoints(points - 25)
        }
    }

    return (
        <div className="flex items-end px-3 py-1 border rounded-lg border-default-border/40 bg-gradient-to-r from-bg via-card-bg/50 to-card-bg">
            <div className="mx-2 mb-2">
                <button
                    className="flex items-center justify-center w-[35px] h-[35px] border-2 border-default-border rounded-xl active:brightness-150 md:hover:bg-gray-400/50"
                    onClick={handleDecrement}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        fill="currentColor"
                        className="text-white bi bi-caret-down-fill"
                        viewBox="0 0 16 16"
                    >
                        <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
                    </svg>
                </button>
            </div>

            <div>
                <div className="text-xs text-center text-secondary">Points</div>

                <input
                    type="text"
                    disabled
                    value={points}
                    className="w-full px-3 py-2 mr-4 text-lg font-bold text-center rounded-2xl bg-input"
                />
            </div>

            <div className="mx-2 mb-2">
                <button
                    className="flex items-center justify-center w-[35px] h-[35px] border-2 border-default-border rounded-xl active:brightness-150 md:hover:bg-gray-400/50"
                    onClick={handleIncrement}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        fill="currentColor"
                        className="text-white bi bi-caret-up-fill"
                        viewBox="0 0 16 16"
                    >
                        <path d="m7.247 4.86-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z" />
                    </svg>
                </button>
            </div>
        </div>
    )
}
