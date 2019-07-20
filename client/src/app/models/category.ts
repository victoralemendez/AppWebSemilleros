export class Category {

    public constructor(
        public _id: String,
        public name: String,
        public description: String,
        public _idParent: String,
        public position: Number,
        public avialable: Boolean
    ) { }

}