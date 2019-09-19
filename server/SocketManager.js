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

                    //io.sockets.connected[io.engine.clients[key].id].emit('changeSecondPlayerToX','for your eyes only');
                    io.sockets.connected[io.engine.clients[key].id].emit('changeFirstPlayerToO');
                }
                
                if(index === 1){
                    
                    //io.sockets.connected[io.engine.clients[key].id].emit('changeSecondPlayerToX','for your eyes only');
                    io.sockets.connected[io.engine.clients[key].id].emit('changeSecondPlayerToX');
                }
            });
        }
    }
    
    // recive a call from the client
    // client.on('serverFunction', () => {

    //     console.log('Button press of : ' + client.id + ' ' + client.handshake.address + ' ' + client.handshake.headers.origin)

    //     Object.keys(io.engine.clients).map(function(key, index) {
            
    //         if(io.engine.clients[key].remoteAddress === client.handshake.address){
    //             if(io.engine.clients[key].id !== client.id){
    //                 io.sockets.connected[io.engine.clients[key].id].emit('clientFunction', 'for your eyes only');
    //             }
    //         }
    //     });
    // });

    // when the client is close or refresh
    client.on('disconnect', (reason) => {
        // Some logic - for future use

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