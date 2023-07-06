import {playerSelector} from '@/app/core/store/players/players.selectors'
import Image from 'next/image'
import React from 'react'
import {useSelector} from 'react-redux'

export default function HeaderTime() {
    const player = useSelector(playerSelector)

    return (
        <div className="flex items-center px-3 py-1 border rounded-lg border-default-border/40 bg-gradient-to-r from-bg via-card-bg/50 to-card-bg">
            <Image
                alt=""
                height={40}
                src={require('../../../../../../public/assets/icons/time.png')}
            />

            {player && (
                <div className="mx-auto font-bold text-center text-white">
                    21:00
                </div>
            )}

            <div></div>
        </div>
    )
}
