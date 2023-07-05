import './globals.css'
import {Inter} from 'next/font/google'
import React, {ReactNode} from 'react'

const inter = Inter({subsets: ['latin']})

export const metadata = {
    title: 'Multiplier Mania',
    description:
        'Predict, Gamble, Win! Rise to the Challenge and Multiply Your Fortune in this Thrilling Guessing Game!',
}

export default function RootLayout({children}: {children: ReactNode}) {
    return (
        <html lang="en">
            <body className={inter.className}>{children}</body>
        </html>
    )
}
