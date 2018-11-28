export const intervalsMapper = (interval) => ({
        1: '1min',
        5: '5min',
        15: '15min',
        30: '30min',
        60: '60min'
    })[ interval ]

export const timeSeriesMapper = (namedInterval) => ({
    '1min': 'Time Series (1min)',
    '5min': 'Time Series (5min)',
    '15min': 'Time Series (15min)',
    '30min': 'Time Series (30min)',
    '60min': 'Time Series (60min)'
})[ namedInterval ]
