const { assert } = require('chai')
import sinon from 'sinon'

import JustifyService from '../../src/services/justify.service.ts'
import JustifyUtils from '../../src/utils/justify.utils.ts'
import { User } from '../../src/models/user.ts'
import { expect } from 'chai'
import EmailAlreadyUseError from '../../src/errors/emailAlreadyUse.error.ts'

const justifyService = new JustifyService()
const justifyUtils = new JustifyUtils()

import { bigInputText, bigInputTextResult } from "../dataSet";


const user = User.build({
    email: "cool@email.com",
    token: "nice-token",
    registered: false,
    dailyLimit: {
        date: new Date().toDateString(),
        dailyWord: 0
    }
});

const userDailyLimit = User.build({
    email: "cool@email.com",
    token: "nice-token",
    registered: false,
    dailyLimit: {
        date: new Date().toDateString(),
        dailyWord: 80000
    }
});

const userMock = sinon.mock(User)

describe("Justify service", async function() {

    after(function() {
        userMock.restore()
    })

    /*it("test justifyText check WordTooLongError",async function() {
        userMock.expects(("findOne")).resolves(user)
        sinon.stub(user, "save").returns(undefined)
        
        sinon.stub(justifyUtils, "checkIfTextValid").returns(false)

        await justifyService.justifyText("cool-token", bigInputText).catch((error) => {
            expect(error.message).to.equal("a word is more than 80 char")
        })
    })*/

    it("test justifyText check NoUserFoundError",async function() {
        userMock.expects(("findOne")).resolves(null)
        
        sinon.stub(justifyUtils, "checkIfTextValid").returns(true)

        await justifyService.justifyText("cool-token", bigInputText).catch((error) => {
            expect(error.message).to.equal(`no user found for the token cool-token`)
        })
    })
})
