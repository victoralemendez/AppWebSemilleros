export class User {

    constructor(
        public _id: String,
        public name: String,
        public surname: String,
        public email: String,
        public password: String,
        public role: String,
        public image: String,
        public score: Number
    ) { }

    public clone() {
        return new User(this._id, this.name, this.surname, this.email, this.password, this.role, this.image, this.score);
    }

}