import React, { Component } from 'react'
import io from 'socket.io-client'
import { Button } from 'react-bootstrap';
import { GiThink } from "react-icons/gi";
import { FaRegFrown, FaRegSmile } from "react-icons/fa";
import Board from '../Board'
import calculateWinner from './calculateWinner'
import calculateTie from './calculateTie'
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
            isMyTurn: false,
            iAmAWinner: false,
            heIsAWinner: false,
            isTie:false
        };
    }

    componentDidMount(){
      this.initSocket()
    }

    initSocket = () => {

      const socket = io(socketUrl);

      socket.on('connect', () => {
        //console.log('Connected');
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
            xIsNext:false,
            isMyTurn: true,
            iAmAWinner: false,
            heIsAWinner: false,
            isTie:false
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
            xIsNext:true,
            iAmAWinner: false,
            heIsAWinner: false,
            isTie:false
          })
        })

        socket.on('rematchAllClients', () => {
          this.setState({
            history: [
              {
                  squares: Array(16).fill(null)
              }
            ],
            stepNumber: 0,
            iAmAWinner: false,
            heIsAWinner: false,
            isTie:false
          })
        })

        socket.on('changeTurnsToAllClients', (lastUpdatedHistory,nextStepNumber) => {
          this.setState({
            history:lastUpdatedHistory,
            stepNumber:nextStepNumber,
            isMyTurn:this.state.isMyTurn ? false : true
          })
        })

        socket.on('youLostTheGame', () => {
          this.setState({
            iAmAWinner: false,
            heIsAWinner:true,
            isTie:false
          })
        })

        socket.on('youAreInATie', () => {
          this.setState({
            iAmAWinner: false,
            heIsAWinner:false,
            isTie:true
          })
        })
      }
      
      this.setState({socket:socket})
    }
    
    handleClick(i) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        
        if ( calculateWinner(squares) || squares[i]) { // preventing extra click on a winner case or on used square case
          return;
        }

        squares[i] = this.state.xIsNext ? "X" : "O";

        const lastUpdatedHistory = history.concat([
          {
            squares: squares
          }
        ])

        const winner = calculateWinner(squares);
        const tie = calculateTie(squares);

        if(winner){

          this.state.socket.emit('theEnemyLost');

          this.setState({
            history: lastUpdatedHistory,
            stepNumber: history.length,
            iAmAWinner: true,
            heIsAWinner: false,
            isTie:false
          });
        }
        else{
          if(tie){

            this.state.socket.emit('itIsATie');

            this.setState({
              history: lastUpdatedHistory,
              stepNumber: history.length,
              iAmAWinner: false,
              heIsAWinner: false,
              isTie:true
            });
          }
          else{
            this.setState({
              history: lastUpdatedHistory,
              stepNumber: history.length
            });
          }
        }

        this.state.socket.emit('changeTurnsRequest',lastUpdatedHistory,this.state.stepNumber);
    }

    rematch(state_instance ){
      
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
            <div className="player-status-header">
              <h3 hidden={this.state.isMyTurn || this.state.iAmAWinner || this.state.heIsAWinner || this.state.isTie}>Please wait...</h3>
              <h3 hidden={!this.state.isMyTurn || this.state.iAmAWinner || this.state.heIsAWinner || this.state.isTie}>
                <span hidden={this.state.xIsNext}>O - </span>
                <span hidden={!this.state.xIsNext}>X - </span>
                It's your turn ! play wise <GiThink />
              </h3>
              <h3 hidden={!this.state.iAmAWinner || this.state.isTie}>
                Congratulations<span hidden={this.state.xIsNext}> O </span><span hidden={!this.state.xIsNext}> X </span>you are the winner <FaRegSmile />
              </h3>
              <h3 hidden={!this.state.heIsAWinner || this.state.isTie}>
                Sorry<span hidden={this.state.xIsNext}> O </span><span hidden={!this.state.xIsNext}> X </span>you are a loser <FaRegFrown />
              </h3>
              <h3 hidden={!this.state.isTie || this.state.iAmAWinner || this.state.heIsAWinner}>It is a tie!</h3>
            </div>
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
