import User from "./models/User.js";

const EMAIL = document.getElementById("email-field") as HTMLInputElement;
const PASSWORD = document.getElementById("password-field") as HTMLInputElement;
const ERRORS = document.getElementById("errors") as HTMLSpanElement;
const SUCCESS = document.getElementById("result") as HTMLDivElement;
const SUBMIT_BTN = document.getElementById("submit-btn") as HTMLButtonElement;
const CANCEL_BTN = document.getElementById("cancel-btn") as HTMLButtonElement;

const firstUser = new User({
  name: { first: "regular", last: "user" },
  address: {
    state: "USA",
    country: "navda",
    city: "las vages",
    street: "52",
    houseNumber: 222222,
    zip: 562145,
  },
  phone: "050-0000000",
  email: "user@gmail.com",
  password: "Aa1234!",
  isBusiness: false,
  isAdmin: false,
});

let users: Array<User> = [firstUser];

const cleanForm = (): void => {
  EMAIL.value = "";
  PASSWORD.value = "";
  ERRORS.innerHTML = "";
};

const login = (
  email: string,
  password: string,
  users: Array<User> = []
): string => {
  SUCCESS.innerHTML = "";
  if (!users.length) return (ERRORS.innerHTML = "Please register");
  if (!EMAIL.value || !PASSWORD.value)
    return (ERRORS.innerHTML = "Please fill in your email and password!");

  let isUserFound = users.find(
    (user: User) => user.email === email && user.password === password
  );
  if (!isUserFound)
    return (ERRORS.innerHTML = "Your email or password is incorrect!");
  cleanForm();
  return (SUCCESS.innerHTML = `${isUserFound._name} you are logged successfully!`);
};

const handleLogin = (e: MouseEvent): void => {
  e.preventDefault();
  login(EMAIL.value, PASSWORD.value, users);
};

const handleClean = (e: MouseEvent): void => {
  e.preventDefault();
  cleanForm();
  SUCCESS.innerHTML = "";
};

CANCEL_BTN.addEventListener("click", (e: MouseEvent) => handleClean(e));
SUBMIT_BTN.addEventListener("click", (e: MouseEvent) => handleLogin(e));
