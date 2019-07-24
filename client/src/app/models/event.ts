export class Event {

    constructor(
        public _id: String,
        public name: String,
        public description: String,
        public score: Number,
        public date: String,
        public image?: String
    ) { }
}
