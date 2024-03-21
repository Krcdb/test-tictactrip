const {assert} = require('chai')

import JustifyUtils from "../../src/utils/justify.utils"

import { bigInputText, bigInputTextResult } from "../dataSet";

describe("Justify Utils", function() {

    it("test with empty string", function() {
        const justify = new JustifyUtils();

        const result = justify.justifyText("")
        assert.equal(result, "")
    })

    it("test with only \\n", function() {
        const justify = new JustifyUtils();

        const result = justify.justifyText("\n\n\n\n")
        assert.equal(result, "\n\n\n\n")
    })

    it("test with big input", function() {
        const justify = new JustifyUtils();

        const result = justify.justifyText(bigInputText)
        assert.equal(result, bigInputTextResult)
    })


})
