import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
    error: {
        lineHeight: '250px',
        height: '250px',
        textAlign: 'center'
    }
})

class Error extends Component {
    render() {
        const { classes } = this.props
        return (
            <div className={ classes.error }>
                {this.props.message}
            </div>
        )
    }
}

Error.propTypes = {
    classes: PropTypes.object,
    message: PropTypes.string
}
export default withStyles(styles)(Error)
