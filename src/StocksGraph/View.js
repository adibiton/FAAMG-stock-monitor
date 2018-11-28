import React from 'react'
import PropTypes from 'prop-types'
import Graph from './Graph'
import Error from './Error'
import IntervalSelector from './IntervalSelector'
import PointSelector from './PointsSelector'
import ThresholdSelector from './ThresholdSelect'
import StocksSelector from './StocksSelector'
import './View.css'

const View = ({
                  error, message, volumeData, points, stockInfo, threshold, stocks,
                  onLoad: handleLoad, onThreshold: handleThreshold, RenderGraph, RenderError
              }) => {
    return (
        <div className="container">
            <h4 className="viewTitle">FAAMG stocks volume chart</h4>
            <form>
                <IntervalSelector onChange={ handleLoad }/>
                <PointSelector onChange={ handleLoad } points={ points }/>
                <ThresholdSelector onChange={ handleThreshold }/>
            </form>
            {error ? <RenderError message={ message }/> :
            <RenderGraph data={ volumeData } onLoad={ handleLoad } threshold={ threshold }/>}
            <div>
                <StocksSelector stocks={ stocks } onChange={ handleLoad }/>
            </div>
        </div>
    )
}

View.defaultProps = {
    RenderGraph: Graph,
    RenderError: Error
}

View.propTypes = {
    error: PropTypes.bool,
    message: PropTypes.string,
    volumeData: PropTypes.array,
    renderLoading: PropTypes.func,
    renderError: PropTypes.func,
    points: PropTypes.number,
    stockInfo: PropTypes.string,
    threshold: PropTypes.number,
    stocks: PropTypes.array,
    onLoad: PropTypes.func,
    onThreshold: PropTypes.func,
    RenderGraph: PropTypes.func,
    RenderError: PropTypes.func
};

export default View
