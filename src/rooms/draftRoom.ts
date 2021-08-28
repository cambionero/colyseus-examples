import { Room, Client } from "colyseus";
import { State } from "./schema/State";
import { Team } from "./schema/Teams";


export class DraftRoom extends Room<State> {
    maxClients = 4;

    onCreate (options: any) {
        console.log("DraftRoom created!",options);

        this.setState(new State());
        var liga:string[]= ["Vikings","Bears","Bills","Cowboys","Patriots","Falcons","Bills","Cowboys"];
        this.state.initiateTeams(liga);


        this.onMessage("message", (client, data) => {
            console.log("DraftRoom received message from", client.sessionId, ":", data);
            this.broadcast("messages", `${ client.sessionId } messaged via onCreate in state-handler-ts.`);
            this.broadcast("messages", `(${client.sessionId}) ${data}`);
        });
        this.onMessage("colormessage", (client, data) => {
            console.log("DraftRoom received message from", client.sessionId, ":", data);
            this.broadcast("messages", `${ client.sessionId } colormessaged via onCreate in state-handler-ts.`);
            this.state.setPlayerName(client.sessionId,data.color);
            this.broadcast("colormessages", data);
        });

        this.onMessage("draftTeam", (client, data) => {
            
            console.log("DraftRoom received message from", client.sessionId, ": Team drafted ", data.draftedTeam.name);
            this.broadcast("messages", `${ client.sessionId } drafted a Team.`);
            this.state.players.get(client.sessionId).teams.add(new Team(data.draftedTeam.name));
            this.state.teams.delete(data.draftedTeam.name);
        });


    }

    onAuth(client, options, req) {
        return true;
    }

    onJoin (client: Client,options: any) {
        console.log("DraftRoom joined!", options);
        //client.send("hello", "world");
        this.state.createPlayer(client.sessionId,options);
        this.broadcast("messages", `${ client.sessionId } joined via onJoin in state-handler-ts.`);
    }

    onLeave (client) {
        this.state.removePlayer(client.sessionId);
        this.broadcast("messages", `${ client.sessionId } has left.`);
    }

    onDispose () {
        console.log("Dispose DraftRoom");
    }

}