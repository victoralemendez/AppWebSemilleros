export class Contact {

    constructor(
        public _id: String,
        public title: String,
        public text: String
    ) { }

    public static buildFromJSON(json: any): Contact {
        return new Contact(json._id, json.title, json.text);
    }

}