'use client'
import React, {useEffect, useState} from 'react'
import {Line} from 'react-chartjs-2'
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
import {CHART_DATA} from '@/app/core/configs/chart/chart-sata.config'
import {CHART_OPTIONS} from '@/app/core/configs/chart/chart-options.config'
import Odometer from 'react-odometerjs'

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
    const [data, setData] = useState({...CHART_DATA})
    const [currentValue, setCurrentValue] = useState('0.00')

    useEffect(() => {
        animateChart(9.6)
    }, [])

    const animateChart = (value: number) => {
        const newData = {...data}
        const targetData = newData.datasets[0].data as any

        const dataPoints = targetData.length
        const increment = value / (dataPoints - 1)

        let currentValue = 0
        const interval = setInterval(() => {
            if (currentValue > value - 1 || currentValue + increment > value) {
                clearInterval(interval)
                return
            }

            currentValue += 1
            targetData.push((currentValue * 10).toFixed(2))
            setData((prevData) => ({
                ...prevData,
                datasets: [
                    {
                        ...prevData.datasets[0],
                        data: targetData,
                    },
                ],
            }))
            setCurrentValue(currentValue.toFixed(2))
        }, 1000)
    }

    return (
        <div className="bg-card border border-default-border w-full min-h-[600px] rounded-lg bg-card-bg relative ">
            <div className="mt-32 font-black text-center text-white text-7xl">
                {currentValue}x
            </div>

            <div className="absolute w-full p-10 bottom-10">
                <Line data={data} options={CHART_OPTIONS} />
            </div>
        </div>
    )
}

export default Chart
