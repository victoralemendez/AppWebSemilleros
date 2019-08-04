export class RequestLoan {

    public constructor(
        public id,
        public user,
        public resource
    ) { }

    public static buildFromJSON(json): RequestLoan {
        return new RequestLoan(json._id, json.user, json.resource);
    }

}