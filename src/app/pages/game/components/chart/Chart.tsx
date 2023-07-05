'use client'
import React, {useEffect, useState} from 'react'
import {
    Chart as ChartJS,
    LineController,
    LineElement,
    PointElement,
    LinearScale,
    Title,
    CategoryScale,
    Filler,
} from 'chart.js'

ChartJS.register(
    LineController,
    LineElement,
    PointElement,
    LinearScale,
    Title,
    CategoryScale,
    Filler,
)

const Chart = () => {
    const [currentValue, setCurrentValue] = useState(0)
    const [threshold, setThreshold] = useState(0)

    useEffect(() => {
        start(Math.random() * (10 - 0) + 0)
    }, [])

    const start = (value: number) => {
        setThreshold(value)
        const interval = setInterval(() => {
            if (currentValue >= value) {
                clearInterval(interval)
                return
            }

            setCurrentValue((prevValue) =>
                prevValue + 0.1 >= value ? value : prevValue + 0.1,
            )
        }, 500 / 5)
    }

    return (
        <div className="bg-card border border-default-border w-full min-h-[600px] rounded-lg bg-card-bg relative ">
            <div
                className={`mt-32 font-black text-center  e text-7xl ${
                    threshold === currentValue ? 'text-red' : 'text-white'
                }`}
            >
                {currentValue.toFixed(2)}x
            </div>

            <div className="absolute w-full p-10 bottom-10"></div>
        </div>
    )
}

export default Chart
