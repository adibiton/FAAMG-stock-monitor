import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import FormControl from '@material-ui/core/FormControl'
import FormLabel from '@material-ui/core/FormLabel'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import RadioGroup from '@material-ui/core/RadioGroup'
import Radio from '@material-ui/core/Radio'
import View from './View';

const styles = theme => ({
    radioGroup: {
        width: 'auto',
        height: 'auto',
        display: 'flex',
        flexWrap: 'nowrap',
        flexDirection: 'row',
    },
    formTitle: {
        color: '#000000'
    },
    radio: {
        color: '#0078d4'
    }
})

class StocksSelector extends React.Component {
    state = {
        value: 'Facebook'
    }

    handleChange = event => {
        this.setState({ value: event.target.value })
        const symbol = this.props.stocks.find(stock => stock.name === event.target.value).symbol
        this.props.onChange({ symbol })
    }

    render() {
        const { classes, stocks } = this.props
        const { value } = this.state
        return (
            <FormControl component="fieldset" className={ classes.formControl }>
                <FormLabel component="legend" className={ classes.formTitle }>Stocks</FormLabel>
                <RadioGroup
                    aria-label="Gender"
                    name="stocks"
                    className={ classes.radioGroup }
                    value={ value }
                    onChange={ this.handleChange }
                >
                    {stocks && stocks.map(stock => <FormControlLabel
                        key={ stock.symbol }
                        value={ stock.name }
                        control={ <Radio className={ classes.radio }/> }
                        label={ stock.name }
                    />)}
                </RadioGroup>
            </FormControl>
        )
    }
}

StocksSelector.propTypes = {
    stocks: PropTypes.array,
    'stocks.find': PropTypes.func,
    onChange: PropTypes.func,
    classes: PropTypes.object
}

export default withStyles(styles)(StocksSelector)
