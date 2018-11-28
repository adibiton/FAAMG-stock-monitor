import React from 'react'
import './App.css'
import StockGraph  from './StocksGraph'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'

const theme = createMuiTheme({
    typography: {
        useNextVariants: true
    }
})

const App = () => (
    <MuiThemeProvider theme={ theme }>
        <StockGraph/>
    </MuiThemeProvider>
)
export default App;
