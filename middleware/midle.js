const res = require("express/lib/response");
const jwt = require("jsonwebtoken");

const checkAccess = (role, status) => {
    return (req, res, next) => {
        let token = req.header("Authorization").split(" ")[1];
        if (!token) {
            res.status(404).send({ message: "token not provided" });
        }

        try {
            let data = jwt.verify(token, "stakan");
            if (!role.includes(data.role)) {
                return res.send(
                    "Ushbu roldagi odam foydalanishi taqiqlanadi !"
                );
            }

            req.userId = data.id;
            req.role = data.role;

            return next();
        } catch (error) {
            res.status(401).send("Error token");
        }
    };
};

module.exports = { checkAccess };
