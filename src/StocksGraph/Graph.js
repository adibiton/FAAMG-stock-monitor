import React, { Component } from 'react'
import PropTypes from 'prop-types'
import dataFormatter from '../utils/dataFormatter'
import { LineChart, Line, YAxis, CartesianGrid, XAxis, Tooltip, ReferenceLine, Label } from 'recharts'

export default class Graph extends Component {
    componentDidMount() {
        const { onLoad } = this.props
        this.intervalId = setInterval(() => onLoad(), 5 * 60 * 1000)
    }

    componentWillUnmount() {
        clearInterval(this.intervalId)
    }

    static getMaxValue(list, key) {
        if (!list || list.length === 0)
            return 0
        return list.reduce((max, entry) => {
            const current = parseInt(entry[ key ])
            if (max < current)
                return current
            return max
        }, 0)
    }

    render() {
        const { data, threshold } = this.props
        return (
            <div>
                <LineChart data={ data } width={ 600 } height={ 250 }>
                    <XAxis dataKey="time" tick={ { fontSize: 9 } }/>
                    <YAxis type="number" tick={ { fontSize: 9 } } tickFormatter={ dataFormatter } orientation="right"
                           domain={ [ 0, dataMax => (dataMax * 1.2) ] }/>
                    <ReferenceLine y={ Graph.getMaxValue(data, 'volume') * threshold * 0.01 } stroke="grey"
                                   strokeWidth={ 2 }
                                   strokeDasharray="3 3">
                        <Label value="Threshold" position="top"></Label>
                    </ReferenceLine>
                    <Tooltip itemStyle={ { fontSize: 10 } } wrapperStyle={ { fontSize: 10 } }/>
                    <CartesianGrid strokeDasharray="3 3"/>
                    <Line type="monotone" dataKey="volume" stroke="#0078d4" dot={ false } strokeWidth={ 2 }/>
                </LineChart>
            </div>
        )
    }
}

Graph.propTypes = {
    data: PropTypes.array,
    onLoad: PropTypes.func,
    threshold: PropTypes.number
}
