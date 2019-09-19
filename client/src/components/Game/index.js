import React, { Component } from 'react'
import io from 'socket.io-client'
import Board from '../Board'
import calculateWinner from './calculateWinner'
import '../../style.css'

const SERVER_IP = 'http://192.168.1.13';
const SERVER_PORT = '3231';
const socketUrl = SERVER_IP + ':' + SERVER_PORT;

class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            history: [
                {
                    squares: Array(16).fill(null)
                }
            ],
            stepNumber: 0,
            xIsNext: false,
            socket: null,
            isMyTurn: true
        };
    }

    componentDidMount(){
      this.initSocket()
    }

    initSocket = () => {

      const socket = io(socketUrl);

      socket.on('connect', () => {
        console.log('Connected');
      })

      if(socket){

        socket.on('changeFirstPlayerToO', () => {
          this.setState({xIsNext:false})
        })

        socket.on('changeSecondPlayerToX', () => {
          this.setState({xIsNext:true})
        })
      }
      
      this.setState({socket:socket})
    }
    
    handleClick(i) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        if (calculateWinner(squares) || squares[i]) { // preventing extra click on used square
          return;
        }
        squares[i] = this.state.xIsNext ? "X" : "O";
        this.setState({
            history: history.concat([
                {
                    squares: squares
                }
            ]),
            stepNumber: history.length
        });
    }

    render() {

        const history = this.state.history;
        const current = history[this.state.stepNumber];
        
        return (
          <div className="game">
            <div className="game-board">
              <Board
                squares={current.squares}
                onClick={i => this.handleClick(i)}
                isMyTurn={this.state.isMyTurn}
              />
            </div>
          </div>
        );
    }
}

export default index;
