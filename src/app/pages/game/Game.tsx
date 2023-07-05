'use client'
import React, {Component} from 'react'
import Chart from './components/chart/Chart'
import ChatBox from './components/chats/ChatBox'
import CurrentRound from './components/configurations/CurrentRound'
import MultiplierConfiguration from './components/configurations/MultiplierConfiguration'
import PointConfiguration from './components/configurations/PointConfiguration'
import SpeedConfiguration from './components/configurations/SpeedConfiguration'
import EnterPlayerName from './components/enter-player-name/EnterPlayerName'
import Ranking from './components/ranking/Ranking'
import Header from './components/headers/Header'

export default class Game extends Component {
    render() {
        return (
            <div className="items-center w-full pt-6 pb-20">
                <div className="grid w-full max-w-screen-xl gap-5 mx-auto lg:grid-cols-6">
                    <div className="lg:col-span-2 col-span-full">
                        {/* <EnterPlayerName /> */}

                        <div className="grid gap-5 lg:grid-cols-2">
                            <PointConfiguration />

                            <MultiplierConfiguration />
                        </div>

                        <button className="w-full py-3 my-3 font-bold text-center rounded-md bg-gradient-to-r from-pink to-orange md:hover:brightness-150">
                            Start
                        </button>

                        <CurrentRound />

                        <SpeedConfiguration />
                    </div>

                    <div className="md:col-span-4 col-span-full">
                        <Header />

                        <div className="mt-5 ">
                            <Chart />
                        </div>
                    </div>
                </div>

                <div className="grid w-full max-w-screen-xl gap-5 mx-auto lg:grid-cols-2">
                    <Ranking />
                    <ChatBox />
                </div>
            </div>
        )
    }
}