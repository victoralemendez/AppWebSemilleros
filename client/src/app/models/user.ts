export class User {

    constructor(
        public _id: String,
        public name: String,
        public surname: String,
        public email: String,
        public password: String,
        public birthday: String,
        public career: String,
        public semester: Number,
        public cvlac?: String,
        public image?: String,
        public score?: Number,
        public adminRole?: Boolean,
        public admitted?: Boolean
    ) { }

    public clean(): void {
        this._id = "";
        this.name = "";
        this.surname = "";
        this.email = "";
        this.password = "";
        this.birthday = "";
        this.career = "";
        this.semester = 0;
        this.cvlac = "";
        this.image = "";
        this.score = 0;
        this.adminRole = false;
        this.admitted = false;
    }
    
}