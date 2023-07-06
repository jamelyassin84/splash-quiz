import React, {useEffect, useState, lazy, Suspense} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {
    playerSelector,
    playersSelector,
} from '@/app/core/store/players/players.selectors'
import {empty} from '@/app/core/helpers/helpers'
import {
    betSelector,
    currentResultSelector,
    roundSelector,
} from '@/app/core/store/round/round.selectors'
import {MessageActions} from '@/app/core/store/message/message.actions'
import {RoundActions} from '@/app/core/store/round/round.actions'
import {socket} from '@/app/socket'
import {PlayerActions} from '@/app/core/store/players/players.actions'
import {Player} from '@/app/core/models/player.model'

const Chart = lazy(() => import('./components/chart/Chart'))
const ChatBox = lazy(() => import('./components/chats/ChatBox'))
const CurrentRound = lazy(
    () => import('./components/configurations/CurrentRound'),
)
const MultiplierConfiguration = lazy(
    () => import('./components/configurations/MultiplierConfiguration'),
)
const PointConfiguration = lazy(
    () => import('./components/configurations/PointConfiguration'),
)
const SpeedConfiguration = lazy(
    () => import('./components/configurations/SpeedConfiguration'),
)
const EnterPlayerName = lazy(
    () => import('./components/enter-player-name/EnterPlayerName'),
)
const Ranking = lazy(() => import('./components/ranking/Ranking'))
const Header = lazy(() => import('./components/headers/Header'))

export function Game() {
    const dispatch = useDispatch()
    const round = useSelector(roundSelector)
    const player = useSelector(playerSelector)
    const players = useSelector(playersSelector)
    const bet = useSelector(betSelector)
    const results = useSelector(currentResultSelector)

    const [isDone, setIsDone] = useState(false)
    const [started, setStarted] = useState(false)

    const defaultAnimationDuration = 15

    // 'playerCreated'

    useEffect(() => {
        if (player) {
            socket.connect()

            socket.on(`playerCreated:${player.id}`, handleNewPlayer)

            return () => {
                socket.off(`playerCreated:${player.id}`, handleNewPlayer)
                socket.disconnect()
            }
        }
    }, [player])

    useEffect(() => {
        if (round) {
            dispatch(MessageActions.load(round.id as string) as any)
        }
    }, [round])

    useEffect(() => {
        if (!empty(results?.winningNumber)) {
            setStarted(true)

            setTimeout(() => {
                clearRound()
            }, (defaultAnimationDuration * 1000) / bet.speed)
        }
    }, [results])

    const handleNewPlayer = (player: Player) => {
        dispatch(PlayerActions.add({...player}))
    }

    const clearRound = () => {
        setIsDone(true)
        setStarted(false)
    }

    const startGame = () => {
        if (round && player) {
            dispatch(
                RoundActions.create({
                    roundId: round.id!,
                    playerId: player?.id!,
                    points: bet.points,
                    multiplier: bet.multiplier,
                    players: players,
                }) as any,
            )
        }
    }

    return (
        <div className="items-center w-full pt-6 pb-20">
            <div className="grid w-full max-w-screen-xl gap-5 mx-auto lg:grid-cols-6">
                <div className="lg:col-span-2 col-span-full">
                    {empty(player) && (
                        <Suspense fallback={<div></div>}>
                            <EnterPlayerName />
                        </Suspense>
                    )}

                    {!empty(player) && (
                        <Suspense fallback={<div></div>}>
                            <div className="grid gap-5 lg:grid-cols-2">
                                <PointConfiguration
                                    bet={bet}
                                    started={started}
                                    onChange={(value: number) =>
                                        dispatch(
                                            RoundActions.config({
                                                ...bet,
                                                points: value,
                                            }),
                                        )
                                    }
                                />

                                <MultiplierConfiguration
                                    bet={bet}
                                    started={started}
                                    onChange={(value: number) =>
                                        dispatch(
                                            RoundActions.config({
                                                ...bet,
                                                multiplier: value,
                                            }),
                                        )
                                    }
                                />
                            </div>

                            {round && (
                                <button
                                    onClick={() => startGame()}
                                    className={`w-full py-3 my-3 font-bold text-center rounded-md bg-gradient-to-r ${
                                        !started
                                            ? ' from-pink to-orange md:hover:brightness-150'
                                            : 'bg-disabled pointer-events-none'
                                    }`}
                                >
                                    {started ? 'Started' : 'Start'}
                                </button>
                            )}

                            <Suspense fallback={<div></div>}>
                                <CurrentRound isDone={isDone} />
                            </Suspense>

                            <Suspense fallback={<div></div>}>
                                <SpeedConfiguration
                                    bet={bet}
                                    started={started}
                                    onChange={(value: number) => {
                                        dispatch(
                                            RoundActions.config({
                                                ...bet,
                                                speed: value,
                                            }),
                                        )
                                    }}
                                />
                            </Suspense>
                        </Suspense>
                    )}
                </div>

                <div className="md:col-span-4 col-span-full">
                    <Suspense fallback={<div></div>}>
                        <Header />
                    </Suspense>

                    <div className="mt-5 ">
                        <Suspense fallback={<div></div>}>
                            <Chart
                                bet={bet}
                                started={started}
                                winningNumber={results?.winningNumber as number}
                                defaultAnimationDuration={
                                    defaultAnimationDuration
                                }
                            />
                        </Suspense>
                    </div>
                </div>
            </div>

            <div className="grid w-full max-w-screen-xl gap-5 mx-auto lg:grid-cols-2">
                <Suspense fallback={<div></div>}>
                    <Ranking isDone={isDone} />
                </Suspense>
                <Suspense fallback={<div></div>}>
                    <ChatBox />
                </Suspense>
            </div>
        </div>
    )
}
