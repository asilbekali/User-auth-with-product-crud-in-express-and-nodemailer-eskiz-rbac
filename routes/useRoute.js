const { Router } = require("express");
const router = Router();
const {
    loginLoger,
    resentOtpLoger,
    verifyOtpLoger,
    accessRefreshTokenLoger,
    sendSmsandEmailLoger,
} = require("../logger");

const {
    resentotp,
    verifyOtp,
    registerUser,
    loginUser,
    refreshtoken,
} = require("../controller/userController");
const { registerLoger } = require("../logger");

/**
 * @swagger
 * tags:
 *   name: User
 *   description: APIs for managing products
 */

/**
 * @swagger
 *  /resent-otp:
 *    post:
 *      tags:
 *        - User
 *      summary: Resend OTP to the user
 *      description: Generates and sends a new OTP to the user's phone and email.
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                phone:
 *                  type: string
 *                  description: User's phone number.
 *                  example: "+998901234567"
 *                email:
 *                  type: string
 *                  description: User's email address.
 *                  example: "user@example.com"
 *      responses:
 *        200:
 *          description: OTP sent successfully.
 *          content:
 *            application/json:
 *              schema:
 *                type: string
 *                example: "1234"
 *        500:
 *          description: Error in resending OTP.
 *
 */

router.post("/resent-otp", resentotp, () => {
    resentOtpLoger("info", "otipi qaytadan jonatildi");
});

/**
 * @swagger
 * /verifiy-otp:
 *   post:
 *     tags:
 *       - User
 *     summary: Verify OTP
 *     description: Verifies the provided OTP against the user's email.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: User's email address.
 *                 example: "user@example.com"
 *               otp:
 *                 type: string
 *                 description: The OTP to verify.
 *                 example: "1234"
 *     responses:
 *       200:
 *         description: OTP verified successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: boolean
 *               example: true
 *       500:
 *         description: Error in verifying OTP.
 */

router.post("/verifiy-otp", verifyOtp, () => {
    verifyOtpLoger("info", "tekshirildi verify orqalik tokeni");
});

/**
 * @swagger
 *  /register:
 *   post:
 *     tags:
 *       - User
 *     summary: Register a new user
 *     description: Registers a new user in the system with name, phone, email, and password.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: User's full name.
 *                 example: "John Doe"
 *               phone:
 *                 type: string
 *                 description: User's phone number.
 *                 example: "+998901234567"
 *               email:
 *                 type: string
 *                 description: User's email address.
 *                 example: "user@example.com"
 *               password:
 *                 type: string
 *                 description: User's password.
 *                 example: "securepassword123"
 *               role:
 *                 type: string
 *                 description: Role of the user.
 *                 example: "user"
 *     responses:
 *       201:
 *         description: User registered successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User registered successfully."
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *       500:
 *         description: Error in user registration.
 */

router.post("/register", registerUser, () => {
    registerLoger.log("info", "user royatdan otdi"),
        accessRefreshTokenLoger.log(
            "info",
            "access token and refresh token created"
        ),
        sendSmsandEmailLoger.log("info", "otp sent sms and email");
});

/**
 * @swagger
 * /login:
 *   post:
 *     tags:
 *       - User
 *     summary: User login
 *     description: Logs in a user and returns a JWT token.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: User's email address.
 *                 example: "user@example.com"
 *               phone:
 *                 type: string
 *                 description: User's phone number.
 *                 example: "+998901234567"
 *               password:
 *                 type: string
 *                 description: User's password.
 *                 example: "securepassword123"
 *               otp:
 *                 type: string
 *                 description: OTP for login verification.
 *                 example: "1234"
 *     responses:
 *       200:
 *         description: Login successful.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Login successful."
 *                 token:
 *                   type: string
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *       401:
 *         description: Invalid credentials.
 *       500:
 *         description: Error in login.*
 *   components:
 *     schemas:
 *       User:
 *         type: object
 *         properties:
 *           id:
 *             type: integer
 *             description: User ID.
 *           name:
 *             type: string
 *             description: Full name of the user.
 *           phone:
 *             type: string
 *             description: Phone number of the user.
 *           email:
 *             type: string
 *             description: Email address of the user.
 *           role:
 *             type: string
 *             description: Role of the user.
 *           status:
 *             type: string
 *             description: Activation status of the user.
 *             example: "Activated"
 *
 */

router.post("/login", loginUser, (req, res) => {
    loginLoger.log("info", "user royxatdan otdi");
    console.log("ishladi");
});

router.post("/refresh-token", refreshtoken, () => {
    refreshtoken.log("info", "refresh token");
});

module.exports = router;
