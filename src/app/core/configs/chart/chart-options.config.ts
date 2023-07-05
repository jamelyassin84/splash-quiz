export const CHART_OPTIONS = {
    scales: {
        y: {
            display: false,
            max: 210,
            beginAtZero: true,
        },
        x: {
            grid: {
                display: false,
            },
            ticks: {
                color: '#585E6C',
            },
        },
    },
    plugins: {
        legend: {
            display: false,
        },
    },
    elements: {
        line: {
            tension: 1,
        },
    },
}
