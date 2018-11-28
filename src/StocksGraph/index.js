import React, { Component } from 'react'
import StocksService from '../services/stockService'
import storageService from '../services/storageService'
import stocks from '../services/stocksMapper'
import View from './View'

export default class extends Component {
    state = {
        threshold: 90,
        symbol: stocks[ 0 ].symbol
    }
    componentDidMount = () => {
        this.stocksService = new StocksService(storageService)
        this.handleLoad()
    }
    handleLoad = async (...args) => {
        try {
            this.setState({ error: false })
            const params = Object.assign({}, { symbol: this.state.symbol }, ...args)
            const stockInfo = await this.stocksService.loadStockName(params)
            const { volumeData, points } = await this.stocksService.loadStockData(params)
            this.setState({ volumeData, stockInfo, points, stocks, symbol: params.symbol })
        } catch (e) {
            this.setState({ error: true, message: 'Oops... we have detected an issue, try again later... ' })
        }
    }
    handleThreshold = ({ threshold }) => {
        this.setState({ threshold })
    }
    render() {
        return (
            <View { ...this.props } { ...this.state } onLoad={ this.handleLoad } onThreshold={ this.handleThreshold }/>
        )
    }
}
