const io = require('./index.js').io

module.exports = function(client){

    Object.keys(io.engine.clients).map(function(key, index) {

        let clientObj = {
            id: io.engine.clients[key].id,
            origin: io.engine.clients[key].request.headers.origin,
            ip: io.engine.clients[key].remoteAddress
        }

        console.log(clientObj);
    });

    console.log('*************************');

    if(io.engine.clients){
        if(io.engine.clients[client.id].server.clientsCount>1){
            Object.keys(io.engine.clients).map(function(key, index) {

                if(index === 0){
                    io.sockets.connected[io.engine.clients[key].id].emit('changeFirstPlayerToO');
                }
                
                if(index === 1){
                    io.sockets.connected[io.engine.clients[key].id].emit('changeSecondPlayerToX');
                }
            });
        }
    }

    client.on('rematchRequest', () => {
        io.sockets.emit('rematchAllClients'); // send to all of the sockets
    })

    client.on('changeTurnsRequest', (lastUpdatedHistory,stepNumber) => {
        io.sockets.emit('changeTurnsToAllClients',lastUpdatedHistory,stepNumber+1); // send to all of the sockets
    })

    client.on('theEnemyLost', () => {
        client.broadcast.emit('youLostTheGame',(client.id)); // send to all except the socket that starts it
    })

    client.on('itIsATie', () => {
        client.broadcast.emit('youAreInATie',(client.id)); // send to all except the socket that starts it
    })
    
    // when the client is close or refresh
    client.on('disconnect', (reason) => {
        
        // Object.keys(io.engine.clients).map(function(key, index) {

        //     let clientObj = {
        //         id: io.engine.clients[key].id,
        //         origin: io.engine.clients[key].request.headers.origin,
        //         ip: io.engine.clients[key].remoteAddress
        //     }
    
        //     console.log(clientObj);
        // });

        // console.log('*************************');
    });
}