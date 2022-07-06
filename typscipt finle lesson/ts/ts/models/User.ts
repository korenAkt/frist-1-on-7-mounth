interface address {
  state?: string;
  country: string;
  city: string;
  street: string;
  houseNumber: number;
  zip: number;;
}

interface name {
  first: string;
  last: string;
}

interface user {
id?: number;
  name: name;
  address: address;
  phone: string;
  email: string;
  password: string;
  isBusiness: boolean;
  isAdmin: boolean;
}

class User {
  #id: number | void;
  #name: string;
  address: address;
  #phone: string;
  #email: string;
  #password: string;
  #createdAt: Date;
  #isAdmin: boolean = false;
  #isBusiness: boolean = false;

  constructor(user: user, users: Array<user> = []) {
    const { email, address, isAdmin, isBusiness, name, password, phone } = user;
    const { first, last } = name;
    this.address = address;
    this.#id = this.generateUniqId(users);
    this.#name = this.setName(first, last);
    this.phone = this.checkPhone(phone);
    this.#email = this.checkEmail(email, users);
    this.#password = this.checkPassword(password);
    this.#isBusiness = isBusiness;
    this.#isAdmin = isAdmin;
    this.#createdAt = new Date();
  }

  randomNumBetween(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  generateUniqId(users: Array<user> = []): number | void {
    const random = this.randomNumBetween(1_000_000, 9_999_999);
    const user = users.findIndex((user: user) => user._id === random);
    if (user === -1) return random;
    this.generateUniqId(users);
  }

  makeFirstLetterCapital(string: string): string {
    const term: string = string.toLowerCase().trim();
    return term.charAt(0).toUpperCase() + term.slice(1);
  }

  setName(first: string, last: string): string {
    const firstName = this.makeFirstLetterCapital(first);
    const lastName = this.makeFirstLetterCapital(last);
    return `${firstName} ${lastName}`;
  }

  changeBusinessStatus(): void {
    this.#isBusiness = !this.#isBusiness;
  }

  checkPhone(phoneNumber: string): string {
    if (
      phoneNumber.match(/^0[0-9]{1,2}(\-?|\s?)[0-9]{3}(\-?|\s?)[0-9]{4}/g) ===
      null
    ) {
      throw new Error("Please enter a valid phone number!");
    }
    retern phoneNumber;
  }

  checkPassword(password: string): string {
    if (
      password.match(
        /((?=.*\d{1})(?=.*[A-Z]{1})(?=.*[a-z]{1})(?=.*[!@#$%^&*-]{1}).{7,20})/g
      ) == null
    )
      throw new Error(
        "The password must contain at least one uppercase letter in English. One lowercase letter in English. Four numbers and one of the following special characters !@#$%^&*-"
      );
    return password;
  }

  checkEmail(email: string, users: Array<user> = []): string {
    if (email.match(/.+@.+\..{2,}/g) === null) {
      throw new Error("Please enter a standarssd email");
    }
    const user = users.findIndex(user => user.email === email);
    if (user !== -1) throw new Error("User is already registered!");
    return email;
  }

  get _id(): number | void {
    return this.#id;
  }

  get _name(): string {
    return this.#name;
  }

  get email(): string {
    return this.#email;
  }

  get password(): string {
    return this.#password;
  }

  get createdAt(): Date {
    return this.#createdAt;
  }

  get isAdmin(): boolean {
    return this.#isAdmin;
  }

  get isBusiness(): boolean {
    return this.#isBusiness;
  
  get phone(): string {
    return this.#phone;
  }
  }
  set phone(phone: string) {
    this.#phone = this.checkPhone(phone);
  }

  set isBusiness(biz: boolean) {
    this.#isBusiness === biz;
  }

  set name({ first, last }: name) {
    this.#name = this.setName(first, last);
  }
}

export default User;
