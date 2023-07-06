import {
    playerSelector,
    playersSelector,
} from '@/app/core/store/players/players.selectors'
import {
    betSelector,
    currentResultSelector,
} from '@/app/core/store/round/round.selectors'
import Image from 'next/image'
import React from 'react'
import {useSelector} from 'react-redux'

interface Props {
    isDone: boolean
}
export default function Ranking(props: Props) {
    const {isDone} = props

    const bet = useSelector(betSelector)
    const players = useSelector(playersSelector)
    const me = useSelector(playerSelector)

    const winningNumber = useSelector(currentResultSelector)?.winningNumber

    // Sort players based on winning numbers in descending order
    const sortedPlayers = players
        .map((p) => {
            if (p && !p.isCPU && bet) {
                return {
                    ...p,
                    bet: bet,
                    distance: Math.abs(bet.multiplier - winningNumber!),
                }
            }

            return {...p, distance: Math.abs(p.bet.multiplier - winningNumber!)}
        })
        .sort((a, b) => {
            if (a.distance !== b.distance) {
                return a.distance - b.distance
            } else {
                return a.bet.multiplier - b.bet.multiplier
            }
        })

    return (
        <div className="mt-5">
            <div className="flex items-end">
                <Image
                    alt=""
                    height={25}
                    className="mr-2"
                    src={require('../../../../../../public/assets/icons/rank.png')}
                />
                <div className="text-xl text-white">Ranking</div>
            </div>

            <div className="w-full mt-2 overflow-hidden border rounded-lg border-default-border">
                <table className="w-full table-fixed">
                    <thead>
                        <tr className="py-2 text-sm text-left text-secondary bg-bg">
                            <th className="px-8 py-1 text-sm">No.</th>
                            <th className="px-8 py-1 text-sm">Name</th>
                            <th className="px-8 py-1 text-sm">Score</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sortedPlayers.length === 0 || !isDone
                            ? [1, 2, 3, 4, 5].map((_, index) => (
                                  <tr key={index}>
                                      <td className="px-8 py-3 text-sm">
                                          {index}
                                      </td>
                                      <td className="px-8 py-3 text-sm">-</td>
                                      <td className="px-8 py-3 text-sm">-</td>
                                  </tr>
                              ))
                            : isDone &&
                              sortedPlayers.map((player, index) => (
                                  <tr key={index}>
                                      <td className="px-8 py-3 text-sm">
                                          {index + 1}
                                      </td>
                                      <td className="px-8 py-3 text-sm">
                                          {player.name === me?.name
                                              ? 'You'
                                              : player.name}
                                      </td>
                                      <td className="px-8 py-3 text-sm">
                                          {player.bet.multiplier * 100}
                                      </td>
                                  </tr>
                              ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
