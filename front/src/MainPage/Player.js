import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import history from '../history/history';



const mapDispatchToProps = {
};


class Player extends React.Component {


    state = {
        player: "stopped",
        currentSong: null,
    }
    componentDidMount() {
    }


    componentDidUpdate(prevProps, prevState) {
        if (this.state.currentSong) {
            this.player.src = this.state.currentSong;
            this.player.play();
        }
        if (this.state.player !== prevState.player) {
            if (this.state.player === "paused") {
                this.player.pause();
            } else if (this.state.player === "stopped") {
                this.player.pause();
                this.setState({ currentSong: null });
            } else if (
                this.state.player === "playing" &&
                prevState.player === "paused"
            ) {
                this.player.play();
            }
        }
    }

    render() {
        const {track}=this.props;
        return (
            <>
            <p>{track.title}</p>
            <button onClick={() => this.setState({ currentSong: track.preview },this.setState({ player: "playing" },console.log(this.state)))}>PLAY!</button>
                <audio ref={ref => (this.player = ref)} />
            </>
        );
    }

}

export default Player;