import {empty} from '@/app/core/helpers/helpers'
import {Bet} from '@/app/core/models/bet.model'
import {ChartData} from '@/app/core/models/system/chart-data.model'
import React, {useEffect, useState} from 'react'
import {Line, LineChart, XAxis, YAxis} from 'recharts'

const CountUp = React.lazy(() => import('react-countup'))

interface Props {
    defaultAnimationDuration: number
    bet: Bet
    winningNumber: number
    started: boolean
    isDone: boolean
}
const Chart = (props: Props) => {
    const {defaultAnimationDuration, bet, started, isDone} = props

    const [data, setData] = useState<ChartData[]>([])
    const [winningNumber, setWinningNumber] = useState<number>(0)

    useEffect(() => {
        if (started) {
            start(props.winningNumber)
        }
    }, [started])

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
            <div
                className={`mt-32 font-black text-center e text-7xl  ${
                    isDone ? 'text-rose-500' : 'text-white'
                }`}
            >
                <React.Suspense fallback={<span></span>}>
                    <CountUp
                        start={0}
                        end={winningNumber}
                        duration={defaultAnimationDuration / (bet?.speed ?? 1)}
                        decimals={2}
                    />
                </React.Suspense>
                x
            </div>

            <div className="absolute w-full p-10 bottom-10">
                {data.length !== 0 && (
                    <div>
                        <LineChart width={730} height={350} data={data}>
                            <XAxis dataKey="name" domain={[0, 50]} />
                            <div className="hidden">
                                <YAxis domain={[0, 10]} />
                            </div>
                            <Line
                                type="monotone"
                                dataKey="value"
                                stroke={'#F8645B'}
                                strokeWidth={5}
                                animationDuration={
                                    (defaultAnimationDuration / bet?.speed) *
                                    1000
                                }
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
