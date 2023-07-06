import {ChartData} from '@/app/core/models/system/chart-data.model'
import React, {useEffect, useState} from 'react'
import CountUp from 'react-countup'
import {Line, LineChart, XAxis, YAxis} from 'recharts'

const Chart = () => {
    const [data, setData] = useState<ChartData[]>([])
    const [winningNumber, setWinningNumber] = useState<number>(0)

    useEffect(() => {
        start(9.64)

        // Math.random() * (10 - 0) + 0
    }, [])

    const start = (endValue: number) => {
        const newData: ChartData[] = []
        let startValue = 0

        for (let i = 0; i <= 10; i++) {
            if (startValue < endValue) {
                newData.push({name: i.toString(), value: startValue})
                startValue += 1
            } else {
                newData.push({name: i.toString(), value: 0})
            }
        }

        let highest = 0
        setWinningNumber(endValue)
        setData(
            newData.map((c) => {
                if (highest <= c.value) {
                    highest = c.value
                    return c
                }

                if (c.value === 0) {
                    return c
                }

                return {...c, value: endValue}
            }),
        )
    }

    const renderDot = (props: any) => {
        const {cx, cy, stroke, value} = props

        const roundedValue = Math.round(value * 10) / 10
        const roundedWinningNumber = Math.round(winningNumber * 10) / 10

        if (
            roundedWinningNumber
                .toString()
                .split('.')[0]
                .includes(roundedValue.toString())
        ) {
            return (
                <circle
                    cx={cx}
                    cy={cy}
                    r={10} // Set a bigger radius for the dot
                    stroke={stroke}
                    fill="#FEBF28"
                    strokeWidth={0}
                />
            )
        }

        return null
    }

    return (
        <div className="bg-card border border-default-border w-full min-h-[600px] rounded-lg bg-card-bg relative">
            <div className={`mt-32 font-black text-center e text-7xl `}>
                <CountUp
                    start={0}
                    end={winningNumber}
                    duration={5}
                    decimals={2}
                />
                x
            </div>

            <div className="absolute w-full p-10 bottom-10">
                {data.length !== 0 && (
                    <div>
                        <LineChart width={730} height={350} data={data}>
                            <XAxis dataKey="name" domain={[0, 10]} />
                            <div className="hidden">
                                <YAxis domain={[0, 10]} />
                            </div>
                            <Line
                                type="monotone"
                                dataKey="value"
                                stroke={'#F8645B'}
                                strokeWidth={5}
                                animationDuration={5 * 1000}
                                dot={renderDot}
                                tension={1}
                            />
                        </LineChart>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Chart
