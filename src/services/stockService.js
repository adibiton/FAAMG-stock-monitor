import { intervalsMapper, timeSeriesMapper } from '../utils/alphaVantageFormatter'
import { handleErrors } from '../utils/handleErrors'
import { alphaApi, apiKey } from '../config/alphaApi'

class StockService {
    constructor(storageService) {
        this.storageService = storageService
    }

    _getObjectFromJson = (response) => {
        return response.json()
    }

    _getStockTradeDataUrl = ({ symbol, interval = '5min', outputSize = 'full' } = {}) => {
        return alphaApi + [ 'query?function=TIME_SERIES_INTRADAY',
            `symbol=${ encodeURIComponent(symbol) }`,
            `interval=${ encodeURIComponent(interval) }`,
            `outputsize=${ outputSize }`,
            `apikey=${ apiKey }` ].join('&')
    }

    _getStockInfoUrl = ({ symbol }) => {
        return alphaApi + [ 'query?function=SYMBOL_SEARCH',
            `keywords=${ symbol }`,
            `apikey=${ apiKey }` ].join('&')
    }

    _normalizeStockInfo = (stockInfo) => {
        return stockInfo.bestMatches[ 0 ][ '2. name' ]
    }

    _validateStockInfo = (stockInfo) => {
        if (!stockInfo || !Array.isArray(stockInfo.bestMatches) || stockInfo.bestMatches.length < 0)
            throw new Error('Stock info response is not valid')
    }

    _normalizeStocksData = (namedInterval) => {
        return ({ stockData, pointsFiltered } = {}) => {
            const volumeData = []
            const stocksData = stockData[ timeSeriesMapper(namedInterval) ]
            Object.keys(stocksData)
                .forEach(time => {
                    const volume = stocksData[ time ][ '5. volume' ]
                    volumeData.push({ time, volume })
                })
            if (pointsFiltered) {
                return { volumeData: volumeData.slice(0, pointsFiltered), points: volumeData.length }
            }
            return { volumeData, points: volumeData.length }
        }
    }

    _fetchFrom = async ({ url, expiry = 60 * 60 } = {}) => {
        const cached = this.storageService.restore(url)
        const cachedTime = this.storageService.restore(url + ':ts')
        if (cached && cachedTime) {
            const age = (Date.now() - cachedTime) / 1000
            if (age < expiry) {
                const response = new Response(new Blob([ cached ]))
                return Promise.resolve(response)
            } else {
                this.storageService.purge(url)
            }
        }
        const response = await fetch(url)
        const content = await response.clone().text()
        this.storageService.archive({ key: url, value: content })
        return response
    }

    _handleEmptyResponse = async (data) => {
        if (data[ 'Note' ]) {
            return Promise.reject()
        }
        return data
    }

    loadStockName = async ({ symbol }) => {
        try {
            const url = this._getStockInfoUrl({ symbol })
            const stockInfo = await this._fetchFrom({ url })
                .then(this._getObjectFromJson)
            this._validateStockInfo(stockInfo)
            return this._normalizeStockInfo(stockInfo)
        } catch (e) {
            console.log(e)
        }
    }

    loadStockData = async ({ symbol, interval = 5, pointsFiltered } = {}) => {
        const namedInterval = intervalsMapper(interval)
        const stockDataUrl = this._getStockTradeDataUrl({ symbol, interval: namedInterval })
        try {
            const stockData = await this._fetchFrom({ url: stockDataUrl, expiry: 5 * 60 })
                .then(handleErrors)
                .then(this._getObjectFromJson)
            this._handleEmptyResponse(stockData)
            return this._normalizeStocksData(namedInterval)({ stockData, pointsFiltered })
        } catch (e) {
            this.storageService.purge(stockDataUrl)
            throw new Error('Exceed number of permitted calls to the API')
        }
    }

}

export default StockService
