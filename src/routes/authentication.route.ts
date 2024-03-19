const express = require('express');
const router = express.Router();

import AuthenticationController from "../controllers/authentication.controller";

const authenticationController = new AuthenticationController()

router.post('/', authenticationController.requestToken);

module.exports = router
