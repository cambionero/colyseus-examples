import { Schema, SetSchema, type, MapSchema } from "@colyseus/schema";
import { Player } from "./Player";
import { Team } from "./Teams";

export class State extends Schema {

    @type({ map: Player })
    players = new MapSchema<Player>();

    @type({ map: Team }) teams = new MapSchema<Team>();


    initiateTeams(teams: string[]) {
        console.log("initiateTeams:",teams);
        for(var i = 0;i<teams.length;i++) { 
            this.teams.set(teams[i],new Team(teams[i]));
            console.log(teams[i],"added") 
        }

    }

    createPlayer(sessionId: string, playerName:string) {
        this.players.set(sessionId, new Player());
        this.setPlayerName(sessionId,playerName);
    }
    setPlayerName(sessionId:string, playerName: string) {
        console.log("setPlayerName called for: ",sessionId," with name: ",playerName);
        this.players.get(sessionId).playerName=playerName;
    }

    removePlayer(sessionId: string) {
        this.players.delete(sessionId);
    }

}