export class Loan {

    constructor(
        public _id: String,
        public user: String,
        public dateStart: String,
        public dateEnd: String,
        public details: String,
        public lender: String,
        public resources: DataResource[],
        public image: String
    ) { }

    public buildFromJSON(json): Loan {
        return new (json._id, json.user, json.dateStart, json.dateEnd, json.note, json.lender, json.resources, json.image);
    }

}

export interface DataResource {
    name: String,
    quantity: Number,
    note: String
}