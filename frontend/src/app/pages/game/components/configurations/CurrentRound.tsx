import {playersSelector} from '@/app/core/store/players/players.selectors'
import {betSelector} from '@/app/core/store/round/round.selectors'
import Image from 'next/image'
import React, {lazy} from 'react'
import {useSelector} from 'react-redux'

interface Props {
    isDone: boolean
}
export default function CurrentRound(props: Props) {
    const {isDone} = props

    const bet = useSelector(betSelector)

    const players = useSelector(playersSelector)

    return (
        <div className="mt-5">
            <div className="flex items-end">
                <Image
                    alt=""
                    height={25}
                    className="mr-2"
                    src={require('../../../../../../public/assets/icons/rank.png')}
                />
                <div className="text-xl text-white">Current Round</div>
            </div>

            <div className="w-full mt-2 overflow-hidden border rounded-lg border-default-border">
                <table className="w-full table-fixed">
                    <thead>
                        <tr className="py-2 text-sm text-left text-secondary bg-bg">
                            <th className="px-8 py-1 text-sm">Name</th>
                            <th className="px-8 py-1 text-sm">Point</th>
                            <th className="px-8 py-1 text-sm">Multiplier</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr
                            className={`px-8 py-3 text-sm ${
                                isDone ? 'text-emerald-500 font-bold' : ''
                            } ${
                                isDone && bet.points === 0 ? 'text-red-500' : ''
                            }`}
                        >
                            <td className={`px-8 py-3`}>You</td>
                            <td className={`px-8 py-3`}>
                                {isDone ? bet.points : '-'}
                            </td>
                            <td className={`px-8 py-3`}>
                                {isDone ? bet.multiplier : '-'}
                            </td>
                        </tr>

                        {players
                            .filter((p) => p.isCPU)
                            .map((player, index) => (
                                <tr
                                    className={`px-8 py-3 text-sm ${
                                        isDone
                                            ? 'text-emerald-500 font-bold'
                                            : ''
                                    } ${
                                        isDone && player.bet.points === 0
                                            ? 'text-red-500'
                                            : ''
                                    }`}
                                    key={index}
                                >
                                    <td className={`px-8 py-3`}>
                                        {player.name}
                                    </td>
                                    <td className={`px-8 py-3`}>
                                        {isDone ? player.bet.points : '-'}
                                    </td>
                                    <td className={`px-8 py-3`}>
                                        {isDone ? player.bet.multiplier : '-'}
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
