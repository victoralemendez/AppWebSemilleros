export class Message {

    constructor(
        public _id: String,
        public fullname: String,
        public email: String,
        public phoneNumber: String,
        public text: String,
        public viewed?: Boolean        
    ) {}
    
}