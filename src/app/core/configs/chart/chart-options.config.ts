import {Bet} from '../../models/bet.model'

export const getChartOptions = (data: {
    defaultAnimationDuration: number
    bet: Bet
}) => {
    const {defaultAnimationDuration, bet} = data

    return {
        scales: {
            x: {
                beginAtZero: true,
                max: 50,
                grid: {
                    display: false,
                },
            },
            y: {
                beginAtZero: true,
                max: 10,
                grid: {
                    display: false,
                },
            },
        },
        plugins: {
            legend: {
                display: false,
            },
        },
        elements: {
            point: {
                radius: 0,
            },
        },
        animation: {
            duration: (defaultAnimationDuration / (bet?.speed ?? 1)) * 1000,
        },
    }
}
