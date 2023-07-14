const express = require('express');
const router = express.Router();

const { login, dashboard } = require("../controllers/main");
const authenticationMiddleware = require("../middleware/auth");

router.get('/dashboard', authenticationMiddleware ,dashboard);
router.post('/login', login);

module.exports = router;