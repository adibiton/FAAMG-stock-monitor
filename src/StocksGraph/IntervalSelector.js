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

class IntervalSelector extends Component {
    state = {
        interval: 5,
        open: false,
    }
    onSelectionChange = event => {
        const interval = event.target.value
        this.setState({ [ event.target.name ]: interval })
        this.props.onChange({ interval })
    }
    onSelectionClose = () => {
        this.setState({ open: false });
    }
    onSelectionOpen = () => {
        this.setState({ open: true })
    }

    render() {
        const { classes } = this.props
        return (
            <FormControl className={ classes.formControl }>
                <InputLabel shrink htmlFor="form-control-select">Interval</InputLabel>
                <Select
                    onOpen={ _ => this.onSelectionOpen }
                    onClose={ _ => this.onSelectionClose }
                    value={ this.state.interval }
                    onChange={ event => this.onSelectionChange(event) }
                    className={ classes.select }
                    inputProps={ {
                        name: 'interval',
                        id: 'interval-select',
                    } }>
                    <MenuItem value={ 60 } className={ classes.menuItem }>1 hour</MenuItem>
                    <MenuItem value={ 30 } className={ classes.menuItem }>30 minuets</MenuItem>
                    <MenuItem value={ 15 } className={ classes.menuItem }>15 minuets</MenuItem>
                    <MenuItem value={ 5 } className={ classes.menuItem }>5 minutes</MenuItem>
                    <MenuItem value={ 1 } className={ classes.menuItem }>1 minute</MenuItem>
                </Select>
            </FormControl>
        )
    }
}

IntervalSelector.propTypes = {
    onChange: PropTypes.func,
    classes: PropTypes.object
}

export default withStyles(styles)(IntervalSelector)
