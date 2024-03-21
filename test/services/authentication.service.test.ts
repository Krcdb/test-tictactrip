const { assert } = require('chai')
import sinon from 'sinon'

import AuthenticationService from '../../src/services/authentication.service'
import AuthenticationUtils from '../../src/utils/authentication.utils.ts'
import { User } from '../../src/models/user.ts'
import { expect } from 'chai'
import EmailAlreadyUseError from '../../src/errors/emailAlreadyUse.error.ts'

const authenticationUtils = new AuthenticationUtils()
const authenticationService = new AuthenticationService()

const newUser = User.build({
    email: "cool@email.com",
    token: "nice-token",
    registered: false,
    dailyLimit: {
        date: new Date().toDateString(),
        dailyWord: 0
    }
});


const userMock = sinon.mock(User)

describe("Authentication service", async function() {
    /*it("test generateTokenAndSaveNewUser normal use",async function() {
        sinon.stub(User, "findOne").returns(null)
        sinon.stub(newUser, "save").returns(undefined)

        //
        /*this doest mock the private property of AuthenticationService..
        /*so i cant mock the result of generateJwt
        //
        //sinon.stub(authenticationUtils, "generateJwt").returns('nice-token')

        const result = await authenticationService.generateTokenAndSaveNewUser("cool@email.com")
        assert.equals(result, 'nice-token')
    })*/

    it("test generateTokenAndSaveNewUser email already use", async function() {
        userMock.expects(("findOne")).resolves(newUser)
        await authenticationService.generateTokenAndSaveNewUser("cool@email.com").catch((error) => {
            expect(error.message).to.equal("this email is already used")
        })
    })

    it("test generateTokenAndSaveNewUser save user failed", async function() {
        userMock.expects(("findOne")).throws(Error)
        await authenticationService.generateTokenAndSaveNewUser("cool@email.com").catch((error) => {
            expect(error.message).to.equal("Error while generating token")
        })
    })
})
