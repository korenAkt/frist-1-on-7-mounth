import User from "./models/User.js";
const firstUser = new User({
    name: { first: "regular", last: "user" },
    address: {
        state: "USA",
        country: "navda",
        city: "las vagos",
        street: "20",
        houseNumber: 1019,
        zip: 21334111,
    },
    phone: "050-0000000",
    email: "user@gmail.com",
    password: "Aa1234!",
    isBusiness: false,
    isAdmin: false,
});
let users = [firstUser];
const EMAIL = document.getElementById("email-field");
const PASSWORD = document.getElementById("password-field");
const ERRORS = document.getElementById("errors");
const SUCCESS = document.getElementById("result");
const SUBMIT_BTN = document.getElementById("submit-btn");
const CANCEL_BTN = document.getElementById("cancel-btn");
const cleanForm = () => {
    EMAIL.value = "";
    PASSWORD.value = "";
    ERRORS.innerHTML = "";
};
const login = (email, password, users = []) => {
    SUCCESS.innerHTML = "";
    if (!users.length)
        return (ERRORS.innerHTML = "Please register");
    if (!EMAIL.value || !PASSWORD.value)
        return (ERRORS.innerHTML = "Please fill in your email and password!");
    let isUserFound = users.find((user) => user.email === email && user.password === password);
    if (!isUserFound)
        return (ERRORS.innerHTML = "Your email or password is incorrect!");
    cleanForm();
    return (SUCCESS.innerHTML = `${isUserFound._name} you are logged successfully!`);
};
const handleLogin = (e) => {
    e.preventDefault();
    login(EMAIL.value, PASSWORD.value, users);
};
const handleClean = (e) => {
    e.preventDefault();
    cleanForm();
    SUCCESS.innerHTML = "";
};
CANCEL_BTN.addEventListener("click", (e) => handleClean(e));
SUBMIT_BTN.addEventListener("click", (e) => handleLogin(e));
