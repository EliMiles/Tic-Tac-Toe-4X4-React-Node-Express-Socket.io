import React, { Component } from 'react'
import io from 'socket.io-client'
import { Button } from 'react-bootstrap';
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

          this.setState({
            history: [
              {
                  squares: Array(16).fill(null)
              }
            ],
            stepNumber: 0,
            xIsNext:false
          })
        })

        socket.on('changeSecondPlayerToX', () => {

          this.setState({
            history: [
              {
                  squares: Array(16).fill(null)
              }
            ],
            stepNumber: 0,
            xIsNext:true
          })
        })

        socket.on('rematchAllClients', () => {
          this.setState({
            history: [
              {
                  squares: Array(16).fill(null)
              }
            ],
            stepNumber: 0
          })
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

    rematch(state_instance ){
      console.log('rematch');
      
      if(state_instance){
        state_instance.socket.emit('rematchRequest');
      }
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
            <div className="rematchButton">
              <Button variant="primary" onClick={() => this.rematch(this.state)}>Rematch</Button>
            </div>
          </div>
        </div>
      );
    }
}

export default index;
