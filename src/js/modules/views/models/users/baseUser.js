export class User {
    constructor(options) {
        this.login = options.login;
        this.name = options.name;
        this.password = options.password;
        this._id = options._id;
        this.gender = options.gender || "";
        this.foto = options.foto || "";
        this.date = options.date || "";
    }

    createCurrentUser() {
        const currentUser = {};
        currentUser.login = this.login;
        currentUser.password = this.password;
        currentUser.name = this.name;
        currentUser._id = this._id;
        currentUser.foto = this.foto;

        return currentUser;
    }
}

