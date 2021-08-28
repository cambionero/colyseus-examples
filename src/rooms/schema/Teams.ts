import { Schema, SetSchema, type } from "@colyseus/schema";

export class Team extends Schema {
    @type("string") name: string;
    @type("number") items: number = 10;
    @type("string") short: string = "MVG";


    constructor(teamname:string) {
        super();
        console.log("constructor Team:",teamname)
        this.name=teamname;
    }

}