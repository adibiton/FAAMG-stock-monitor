import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import InputLabel from '@material-ui/core/InputLabel'
import FormControl from '@material-ui/core/FormControl'
import { withStyles } from '@material-ui/core/styles'
import View from './View';

const styles = theme => ({
    formControl: {
        margin: theme.spacing.unit,
        minWidth: 120,
    },
    inputLabel: {
        fontSize: '16px'
    },
    select: {
        fontSize: '10px',
        textAlign: 'center'
    },
    menuItem: {
        fontSize: '10px'
    }
})

class PointsSelector extends Component {
    state = {
        pointsFiltered: ''
    }
    onChange = event => {
        const pointsFiltered = event.target.value
        this.setState({ [ event.target.name ]: pointsFiltered })
        this.props.onChange({ pointsFiltered })
    }

    getPointsRange = (length, points) => [ ...Array.from({ length }, (v, k) => 100 * (k + 1)), points ].reverse()
    getPointsValue = ({ pointsFiltered, points }) => {
        if (pointsFiltered && pointsFiltered < points)
            return pointsFiltered
        return points || 0
    }

    render() {
        const { classes, points } = this.props
        const { pointsFiltered } = this.state
        return (
            <FormControl className={ classes.formControl }>
                <InputLabel shrink htmlFor="points-select" className={ classes.inputLabel }>Points</InputLabel>
                <Select
                    onOpen={ this.onOpen }
                    onClose={ this.onClose }
                    value={ this.getPointsValue({ pointsFiltered, points }) }
                    onChange={ this.onChange }
                    className={ classes.select }
                    inputProps={ {
                        name: 'pointsFiltered',
                        id: 'points-select',
                    } }>
                    {this.getPointsRange(Math.floor(points / 100), points).map((x, i) =>
                        <MenuItem key={ i } value={ x } className={ classes.menuItem } >{x}</MenuItem>)}
                </Select>
            </FormControl>
        )
    }
}

PointsSelector.propTypes = {
    onChange: PropTypes.func,
    classes: PropTypes.object,
    points: PropTypes.number
}

export default withStyles(styles)(PointsSelector)
