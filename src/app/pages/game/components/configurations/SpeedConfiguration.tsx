import Image from 'next/image'
import React, {useState} from 'react'

export default function SpeedConfiguration() {
    const [speed, setSpeed] = useState(1)

    const handleChange = (event: any) => {
        const selectedSpeed = parseFloat(event.target.value)
        setSpeed(selectedSpeed)
    }

    return (
        <div className="w-full">
            <div className="flex items-end mt-5">
                <Image
                    alt=""
                    height={25}
                    className="mr-2"
                    src={require('../../../../../../public/assets/icons/rank.png')}
                />
                <div className="text-xl text-white">Speed</div>
            </div>

            <div className="flex flex-col items-center px-3 py-4 border rounded-lg border-default-border/40 bg-gradient-to-r from-bg via-card-bg/50 to-card-bg">
                <input
                    type="range"
                    value={speed}
                    min={1}
                    max={5}
                    step={0.01}
                    onChange={handleChange}
                    className="w-full h-4 mb-4 rounded-lg appearance-none bg-secondary slider-thumb"
                />

                <div className="flex justify-between w-full">
                    <div
                        className={`text-xs ${
                            speed >= 1 ? 'text-pink' : 'text-white'
                        }`}
                    >
                        1x
                    </div>
                    <div
                        className={`text-xs ${
                            speed >= 2 ? 'text-pink' : 'text-white'
                        }`}
                    >
                        2x
                    </div>
                    <div
                        className={`text-xs ${
                            speed >= 3 ? 'text-pink' : 'text-white'
                        }`}
                    >
                        3x
                    </div>
                    <div
                        className={`text-xs ${
                            speed >= 4 ? 'text-pink' : 'text-white'
                        }`}
                    >
                        4x
                    </div>
                    <div
                        className={`text-xs ${
                            speed === 5 ? 'text-pink' : 'text-white'
                        }`}
                    >
                        5x
                    </div>
                </div>
            </div>
        </div>
    )
}
