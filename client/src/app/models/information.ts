export class Information {

    constructor(
        public _id: String,
        public name: String,
        public text: String,
        public position: Number
    ) { }

    public static createFromJSON(json: any) {
        return new Information(json._id, json.name, json.text, json.position);
    }

}