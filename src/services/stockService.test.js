'use strict'
import StocksService from './stockService'
import testFixtures from '../test/testFixtures'

const mockStorage = {
    archive: jest.fn(),
    restore: jest.fn(),
    purge: jest.fn()
}

const stocksService = new StocksService(mockStorage)

describe('stockService', () => {
    fetch.mockResponse(JSON.stringify(testFixtures.nonoStockInfo))
    test('call to loadStockName and get stock name', async () => {
        const expectedStockName = testFixtures.nonoStockName
        const data = await stocksService.loadStockName({ symbol:'NONO' })
        expect(data).toBeDefined()
        expect(data).toBe(expectedStockName)
        expect(mockStorage.archive).toBeCalled()
        expect(mockStorage.restore).toBeCalled()
    })
    
    test('calls to loadStockData and get stock data', async () => {
        fetch.mockResponse(JSON.stringify(testFixtures.nonoStockData))
        const data = await stocksService.loadStockData({ symbol:'NONO' })
        expect(data).toBeDefined()
        expect(data.volumeData).toBeDefined()
        expect(data.volumeData.length).toBe(4)
        expect(mockStorage.archive).toBeCalled()
        expect(mockStorage.restore).toBeCalled()
    })
})
