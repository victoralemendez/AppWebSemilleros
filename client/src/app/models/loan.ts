export class Loan {

    public constructor(
        public id,
        public user,
        public resource
    ) { }

    public static buildFromJSON(json): Loan {
        return new Loan(json._id, json.user, json.resource);
    }

}