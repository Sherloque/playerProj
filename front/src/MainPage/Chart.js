import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import history from '../history/history';
import jwt_decode from 'jwt-decode';
import {fetchHotChart} from '../store/action.js'
import {getHotChart} from '../store/action.js'
import Player from './Player'

const mapStateToProps = store => {
    console.log(store)
   return  ({
    chartSongs: store.chart.chartSongs,
})
}
;



const mapDispatchToProps = {
    fetchHotChart
  };
  
class Chart extends React.Component {


    state={
        player:"stopped",
        currentSong: null,
    }
    componentDidMount() {
        this.props.fetchHotChart();
      }

    render() {
        const {chartSongs} = this.props
        return (
            <>
            {(chartSongs.data )? (chartSongs.data.map(item => (<Player track={item}></Player>))) 
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            : (<p>LOADING...</p>)}
            </>
        );
    }

}

let ConnectedChart = connect(mapStateToProps, mapDispatchToProps)(Chart);

export default ConnectedChart;