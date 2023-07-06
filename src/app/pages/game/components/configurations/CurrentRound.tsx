import {playersSelector} from '@/app/core/store/players/players.selectors'
import Image from 'next/image'
import React from 'react'
import {useSelector} from 'react-redux'

export default function CurrentRound() {
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
                        {players.map((player, index) => (
                            <tr key={index}>
                                <td
                                    className={`px-8 py-3 text-sm ${
                                        !player.isCPU
                                            ? 'bg-[#485062] ${#important}'
                                            : ''
                                    }`}
                                >
                                    {player.isCPU ? player.name : 'You'}
                                </td>
                                <td className="px-8 py-3 text-sm">-</td>
                                <td className="px-8 py-3 text-sm">-</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
