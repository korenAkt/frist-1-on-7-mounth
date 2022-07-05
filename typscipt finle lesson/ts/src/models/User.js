class User {
    #id;
    #name;
    address;
    #phone;
    #email;
    #password;
    #createdAt;
    #isAdmin = false;
    #isBusiness = false;
    constructor(user, users = []) {
        const { email, address, isAdmin, isBusiness, name, password, phone } = user;
        const { first, last } = name;
        this.address = address;
        this.#id = this.generateUniqId(users);
        this.#name = this.setName(first, last);
        this.#phone = this.checkPhone(phone);
        this.#email = this.checkEmail(email, users);
        this.#password = this.checkPassword(password);
        this.#isBusiness = isBusiness;
        this.#isAdmin = isAdmin;
        this.#createdAt = new Date();
    }
    randomNumBetween(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
    generateUniqId(users = []) {
        const random = this.randomNumBetween(1_000_000, 9_999_999);
        const user = users.findIndex((user) => user._id === random);
        if (user === -1)
            return random;
        this.generateUniqId(users);
    }
    makeFirstLetterCapital(string) {
        const term = string.toLowerCase().trim();
        return term.charAt(0).toUpperCase() + term.slice(1);
    }
    setName(first, last) {
        const firstName = this.makeFirstLetterCapital(first);
        const lastName = this.makeFirstLetterCapital(last);
        return `${firstName} ${lastName}`;
    }
    changeBusinessStatus() {
        this.#isBusiness = !this.#isBusiness;
    }
    checkPhone(phoneNumber) {
        if (phoneNumber.match(/^0[0-9]{1,2}(\-?|\s?)[0-9]{3}(\-?|\s?)[0-9]{4}/g) ===
            null) {
            throw new Error("Please enter a valid phone number!");
        }
        return phoneNumber;
    }
    checkPassword(password) {
        if (password.match(/((?=.*\d{1})(?=.*[A-Z]{1})(?=.*[a-z]{1})(?=.*[!@#$%^&*-]{1}).{7,20})/g) === null)
            throw new Error("The password must contain at least one uppercase letter in English. One lowercase letter in English. Four numbers and one of the following special characters !@#$%^&*-");
        return password;
    }
    checkEmail(email, users = []) {
        if (email.match(/.+@.+\..{2,}/g) === null) {
            throw new Error("Please enter a standard email");
        }
        const user = users.findIndex(user => user.email === email);
        if (user !== -1)
            throw new Error("User is already registered!");
        return email;
    }
    get _id() {
        return this.#id;
    }
    get _name() {
        return this.#name;
    }
    get email() {
        return this.#email;
    }
    get password() {
        return this.#password;
    }
    get createdAt() {
        return this.#createdAt;
    }
    get isAdmin() {
        return this.#isAdmin;
    }
    get isBusiness() {
        return this.#isBusiness;
    }
    get phone() {
        return this.#phone;
    }
    set phone(phone) {
        this.#phone = this.checkPhone(phone);
    }
    set isBusiness(biz) {
        this.#isBusiness === biz;
    }
    set name({ first, last }) {
        this.#name = this.setName(first, last);
    }
}
export default User;
