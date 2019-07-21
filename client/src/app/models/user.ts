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
        public student: Boolean,
        public cvlac?: String,
        public image?: String,
        public score?: Number,
        public adminRole?: Boolean,
        public admitted?: Boolean
    ) { }

    public static buildFromJSON(json): User {
        return new User(json._id, json.name, json.surname, json.email, json.password, json.bornDate, json.career, json.semester, json.student, json.cvlac, json.image, json.score, json.adminRole, json.admitted);
    }
    
}