export class Course {

    constructor(
        public _id: String,
        public name: String,
        public description: String,
        public link: String,
        public score: Number,
        public startDate: String,
        public endDate: String,
        public teacher: String,
        public internalTeacher: Boolean,
        public image?: any
    ) {}

}