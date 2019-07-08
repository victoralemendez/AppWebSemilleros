export class User {

    constructor(
        public _id: String,
        public name: String,
        public surname: String,
        public email: String,
        public password: String,
        public bornDate: String,
        public career: String,
        public semester: Number,
        public cvlac?: String,
        public image?: String,
        public score?: Number,
        public adminRole?: Boolean,
        public admitted?: Boolean
    ) { }

    public static buildFromJSON(json): User {
        return new User(json._id, json.name, json.surname, json.email, json.password, json.bornDate, json.carrer, json.semester, json.cvlac, json.image, json.score, json.adminRole, json.admitted);
    }
    
}