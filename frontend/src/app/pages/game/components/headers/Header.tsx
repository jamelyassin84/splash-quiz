import React, {lazy, Suspense} from 'react'

const HeaderTotalPoints = lazy(() => import('./HeaderTotalPoints'))
const HeaderPlayerName = lazy(() => import('./HeaderPlayerName'))
const HeaderTime = lazy(() => import('./HeaderTime'))

export default function Header() {
    return (
        <div className="grid grid-cols-3 gap-5">
            <Suspense fallback={<div></div>}>
                <HeaderTotalPoints />
            </Suspense>
            <Suspense fallback={<div></div>}>
                <HeaderPlayerName />
            </Suspense>
            <Suspense fallback={<div></div>}>
                <HeaderTime />
            </Suspense>
        </div>
    )
}
