import global from "./global";

export default {
    data() {
        return {
            firstname: "",
            lastname: "",
            email: "",
            phonenumber: "",
            password: "",
            confirmpassword: "",
            showpwarea: false,
            confpw: "password",
            pw: "password",
            termsofservice: false,
            datatermsofuse: false,
        };
    },
    mixins: [global],
    methods: {
        togglepwarea(val) {
            this.showpwarea = val;
        },
        validate() {
            const { firstname, lastname, email, phonenumber } = this;

            if (firstname.length && lastname.length) {
            } else {
                return this.showautherror("please fill out all fields");
            }
        },
        isValidEmail(email) {
            const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
            return regex.test(email);
        },
        setvisible(subjt) {
            if (subjt === "password") {
                return this.pw === "password" ? (this.pw = "text") : (this.pw = "password");
            }

            if (subjt === "confirmpassword") {
                return this.confpw === "password"
                    ? (this.confpw = "text")
                    : (this.confpw = "password");
            }
        },
        isValidPassword(password) {
            const hasUppercase = /[A-Z]/.test(password);
            const hasLowercase = /[a-z]/.test(password);
            const hasNumber = /\d/.test(password);
            const hasSpecialChar = /[!@#\$%\^&\*]/.test(password);
            const isEightOrMoreChars = password.length >= 8;

            return (
                hasUppercase && hasLowercase && hasNumber && hasSpecialChar && isEightOrMoreChars
            );
        },
    },
    computed: {
        allowcont() {
            const {
                firstname,
                lastname,
                email,
                phonenumber,
                isValidEmail,
                isOnlyLetters,
                isOnlyNumbers,
            } = this;

            if (!firstname.length) {
                return false;
            }

            if (!lastname.length) {
                return false;
            }

            if (!isOnlyLetters(firstname)) {
                return false;
            }

            if (!isOnlyLetters(lastname)) {
                return false;
            }

            if (!email.length || !isValidEmail(email)) {
                return false;
            }

            if (!phonenumber.length) {
                return false;
            }

            if (!isOnlyNumbers(phonenumber)) {
                return false;
            }

            return true;
        }
    },
    watch: {
        email(newval, oldval) {
            const { isValidEmail } = this;

            if (!isValidEmail(newval)) {
                return this.showautherror("invalid email");
            }

            return this.removeautherror();
        },
        firstname(newval, oldval) {
            const { isOnlyLetters } = this;

            if (!isOnlyLetters(newval)) {
                return this.showautherror("first name should contain only letters");
            }

            return this.removeautherror();
        },
        lastname(newval, oldval) {
            const { isOnlyLetters } = this;

            if (!isOnlyLetters(newval)) {
                return this.showautherror("last name should contain only letters");
            }

            return this.removeautherror();
        },
        phonenumber(newval, oldval) {
            const { isOnlyNumbers } = this;

            if (!isOnlyNumbers(newval)) {
                return this.showautherror("phone numbers should contain only numbers");
            }

            return this.removeautherror();
        },
        password(newval, oldval) {
            const { password, confirmpassword, isValidPassword } = this;

            if (!isValidPassword(newval)) {
                return this.showautherror("invalid password");
            }

            if (newval !== confirmpassword) {
                return this.showautherror("password should be the same as confirm password");
            }

            return this.removeautherror();
        },
        confirmpassword(newval, oldval) {
            const { password, confirmpassword } = this;

            if (password !== newval) {
                return this.showautherror("confirm password should be the same as password");
            }

            return this.removeautherror();
        },
    },
};