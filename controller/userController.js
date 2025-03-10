const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const { totp } = require("otplib");
const { db } = require("../config/db");
const sendSms = require("../config/eskiz");
const { sendEmail } = require("../config/nodemailer");
const { validateUser } = require("../validation/userValid");
const jwt = require("jsonwebtoken");

async function findUser(phone) {
    try {
        const newUser = await User.findOne({ where: { phone } });
        return newUser;
    } catch (error) {
        console.log(error);
    }
}

totp.options = {
    digits: 4,
    step: 30000,
};

const resentotp = async (req, res) => {
    const { phone, email } = req.body;
    const otp = totp.generate(email + "test");
    await sendSms(phone, otp);
    await sendEmail(email, otp);

    res.send(otp);
    try {
    } catch (error) {
        console.log(error);
    }
};

const verifyOtp = async (req, res) => {
    const { email, otp } = req.body;
    console.log(otp);
    try {
        const match = totp.verify({ token: otp, secret: email + "test" });
        res.send(match);
    } catch (error) {
        console.log(error);
        res.send(error);
    }
};

const registerUser = async (req, res) => {
    try {
        const { error, value } = validateUser(req.body);
        if (error) {
            res.send(error);
            return;
        }

        let hash = bcrypt.hashSync(value.password, 10);
        const phone = value.phone;
        const bazaUser = await User.findOne({ where: { phone } });
        if (bazaUser) {
            res.send("user Already exists");
            return;
        }

        let user = await User.create({
            name: value.name,
            phone: phone,
            password: hash,
            email: value.email,
            role: value.role,
            status: "No activited",
        });
        const email = value.email;
        const otp = totp.generate(email + "stakan"); // email va tel raqamga sms jonatish
        await sendSms(phone, otp);
        await sendEmail(email, otp);
        console.log(otp);
        res.send(user);
    } catch (error) {
        console.log(error);
        res.send("error in register");
    }
};

const loginUser = async (req, res) => {
    const { password, phone, email, otp } = req.body;
    try {
        let match = totp.verify({ token: otp, secret: email + "stakan" });
        if (!match) {
            res.status(404).send({ message: "otp not valide" });
            return;
        }
        const bazaUser = await User.findOne({ where: { phone } });
        if (!bazaUser) {
            return res.status(404).send("User not found");
        }

        const isPasswordCorrect = bcrypt.compareSync(
            password,
            bazaUser.password
        );
        if (!isPasswordCorrect) {
            return res.status(401).send("Invalid password");
        }

        await bazaUser.update({ status: "Activited" });

        const token = jwt.sign(
            { id: bazaUser.id, role: bazaUser.role, status: bazaUser.status },
            "stakan"
        );

        res.send({ message: "Login successful", token });
    } catch (error) {
        console.log(error);
        res.status(500).send("Error in login!");
    }
};

module.exports = { resentotp, verifyOtp, registerUser, loginUser };
