import { Schema, type,SetSchema, MapSchema } from "@colyseus/schema";
import { Team } from "./Teams";

export class Player extends Schema {
    @type("string") playerName: string;
    @type("boolean") myturn: boolean=false;
    @type({ set: Team }) teams = new SetSchema<Team>();

    //eigentlich nicht benötigt, kann auch direkt aufgerufen werden
    draftTeam(team: Team) {
        this.teams.add(team);
    }
}

