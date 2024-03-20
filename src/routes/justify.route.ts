const express = require('express');
const router = express.Router();

import JustifyController from '../controllers/justify.controller';
import AuthenticationMiddeware from "../middleware/authentication.middleware";

const justifyController = new JustifyController()
const authenticationMiddeware = new AuthenticationMiddeware()

router.post('/',authenticationMiddeware.verifyJwt, justifyController.justifyText);

module.exports = router
