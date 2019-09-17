import React, { Component } from 'react'
import io from 'socket.io-client'

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
            <div>
                <button onClick={this.sendToServer}>send to server</button>
            </div>
        )
    }
}

export default index;
