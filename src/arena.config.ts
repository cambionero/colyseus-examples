import Arena from "@colyseus/arena";
import { monitor } from "@colyseus/monitor";
import path from 'path';
import serveIndex from 'serve-index';
import express from 'express';

// import { uWebSocketsTransport} from "@colyseus/uwebsockets-transport";

// Import demo room handlers
import { LobbyRoom, RelayRoom } from 'colyseus';
import { ChatRoom } from "./rooms/01-chat-room";
import { StateHandlerRoom } from "./rooms/02-state-handler";
import { AuthRoom } from "./rooms/03-auth";
import { ReconnectionRoom } from './rooms/04-reconnection';
import { CustomLobbyRoom } from './rooms/07-custom-lobby-room';
import { DraftRoom } from './rooms/draftRoom';


export default Arena({
    getId: () => "Your Colyseus App",

    // initializeTransport: (options) => new uWebSocketsTransport(options),

    initializeGameServer: (gameServer) => {
        // Define "lobby" room
 
        gameServer.define("draftRoom", DraftRoom)
        .enableRealtimeListing();

        gameServer.onShutdown(function(){
            console.log(`game server is going down.`);
          });


    },

    initializeExpress: (app) => {
        app.use('/', serveIndex(path.join(__dirname, "static"), {'icons': true}))
        app.use('/', express.static(path.join(__dirname, "static")));

        // app.use(serveIndex(path.join(__dirname, "static"), {'icons': true}))
        // app.use(express.static(path.join(__dirname, "static")));

        // (optional) attach web monitoring panel
        app.use('/colyseus', monitor());
    },


    beforeListen: () => {
        /**
         * Before before gameServer.listen() is called.
         */
    }
});
