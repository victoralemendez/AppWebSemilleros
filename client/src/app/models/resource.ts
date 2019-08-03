export class Resource {

    constructor(
        public _id: String,
        public name: String,
        public description: String,
        public avialable: Boolean,
        public reference: String,
        public features: String,
        public category: any,
        public user: String,
        public image?: String
    ) { }

}