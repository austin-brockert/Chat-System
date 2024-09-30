const { Signup, Signin } = require('../Controllers/AuthController');
const {userVerification} = require('../Middlewares/AuthMiddleware')
const router = require('express').Router();

router.post("/", userVerification);
router.post("/signup", Signup);
router.post("/login", Signin);

module.exports = router;