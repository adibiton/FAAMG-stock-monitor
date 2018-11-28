import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import InputLabel from '@material-ui/core/InputLabel'
import FormControl from '@material-ui/core/FormControl'
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
    formControl: {
        margin: theme.spacing.unit,
        minWidth: 120,
    },
    inputLabel: {
        fontSize: '16px'
    },
    menuItem: {
        fontSize: '10px'
    },
    select: {
        fontSize: '10px',
        textAlign: 'center'
    }
})

class ThresholdSelect extends Component {
    state = {
        threshold: 90
    }
    onChange = event => {
        const threshold = event.target.value
        this.setState({ [ event.target.name ]: threshold })
        this.props.onChange({ threshold })
    }

    getThresholdRange = () => [ ...Array.from({ length: 10 }, (v, k) => 10 * (k + 1)) ].reverse()

    render() {
        const { classes } = this.props
        const { threshold } = this.state
        return (
            <FormControl className={ classes.formControl }>
                <InputLabel shrink htmlFor="points-select" className={ classes.inputLabel }>Threshold</InputLabel>
                <Select
                    onOpen={ this.onOpen }
                    onClose={ this.onClose }
                    value={ threshold }
                    onChange={ this.onChange }
                    className={ classes.select }
                    inputProps={ {
                        name: 'threshold',
                        id: 'threshold-select',
                    } }>
                    {this.getThresholdRange().map((x) =>
                        <MenuItem key={ x } value={ x } className={ classes.menuItem }>{x}</MenuItem>)}
                </Select>
            </FormControl>
        )
    }
}

ThresholdSelect.propTypes = {
    onChange: PropTypes.func,
    classes: PropTypes.object
}

export default withStyles(styles)(ThresholdSelect)
