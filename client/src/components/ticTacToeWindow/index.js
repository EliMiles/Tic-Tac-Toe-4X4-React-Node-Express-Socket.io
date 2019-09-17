import React, { Component } from 'react'
import io from 'socket.io-client'
import { Container, Row, Col } from 'react-bootstrap'
import TicTacToeSquare from '../ticTacToeSquare'

const SERVER_IP = 'http://192.168.1.13';
const SERVER_PORT = '3231';
const socketUrl = SERVER_IP + ':' + SERVER_PORT;

class index extends Component {
    
    constructor(props) {
        super(props);

        this.state = {
            socket:null
        };
    }

    componentDidMount(){
        this.initSocket()
    }

    initSocket = () => {

        // const opt = {
        //     transports: ['websocket']
        // }

        //const socket = io(socketUrl,opt);
        const socket = io(socketUrl);

        socket.on('connect', () => {
            console.log('Connected');
        })

        this.setState({socket})
    }

    sendToServer = (e) => {

        this.state.socket.emit('serverFunction');
    }

    render() {

        if(this.state.socket){

            this.state.socket.on('clientFunction', function (data) {
                console.log(data);
            });
        }

        return (
            <Container className="window">
                <Row>
                    <Col className="square" xs="3" sm="3" md="3" large="3" xl="3">
                        <TicTacToeSquare position="0-0"/>
                    </Col>
                    <Col className="square" xs="3" sm="3" md="3" large="3" xl="3">
                        <TicTacToeSquare position="0-1"/>
                    </Col>
                    <Col className="square" xs="3" sm="3" md="3" large="3" xl="3">
                        <TicTacToeSquare position="0-2"/>
                    </Col>
                    <Col className="square" xs="3" sm="3" md="3" large="3" xl="3">
                        <TicTacToeSquare position="0-3"/>
                    </Col>
                </Row>
                <Row>
                    <Col className="square" xs="3" sm="3" md="3" large="3" xl="3">
                        <TicTacToeSquare position="1-0"/>
                    </Col>
                    <Col className="square" xs="3" sm="3" md="3" large="3" xl="3">
                        <TicTacToeSquare position="1-1"/>
                    </Col>
                    <Col className="square" xs="3" sm="3" md="3" large="3" xl="3">
                        <TicTacToeSquare position="1-2"/>
                    </Col>
                    <Col className="square" xs="3" sm="3" md="3" large="3" xl="3">
                        <TicTacToeSquare position="1-3"/>
                    </Col>
                </Row>
                <Row>
                    <Col className="square" xs="3" sm="3" md="3" large="3" xl="3">
                        <TicTacToeSquare position="2-0"/>
                    </Col>
                    <Col className="square" xs="3" sm="3" md="3" large="3" xl="3">
                        <TicTacToeSquare position="2-1"/>
                    </Col>
                    <Col className="square" xs="3" sm="3" md="3" large="3" xl="3">
                        <TicTacToeSquare position="2-2"/>
                    </Col>
                    <Col className="square" xs="3" sm="3" md="3" large="3" xl="3">
                        <TicTacToeSquare position="2-3"/>
                    </Col>
                </Row>
                <Row>
                    <Col className="square" xs="3" sm="3" md="3" large="3" xl="3">
                        <TicTacToeSquare position="3-0"/>
                    </Col>
                    <Col className="square" xs="3" sm="3" md="3" large="3" xl="3">
                        <TicTacToeSquare position="3-1"/>
                    </Col>
                    <Col className="square" xs="3" sm="3" md="3" large="3" xl="3">
                        <TicTacToeSquare position="3-2"/>
                    </Col>
                    <Col className="square" xs="3" sm="3" md="3" large="3" xl="3">
                        <TicTacToeSquare position="3-3"/>
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default index;
