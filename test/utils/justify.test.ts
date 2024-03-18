const {assert} = require('chai')

import Justify from "../../src/utils/justify"

import { bigInputText, bigInputTextResult } from "../dataSet";

describe("Justify test", function() {

    it("test with empty string", function() {
        const justify = new Justify();

        const result = justify.justifyText("")
        assert.equal(result, "")
    })

    it("test with only \\n", function() {
        const justify = new Justify();

        const result = justify.justifyText("\n\n\n\n")
        assert.equal(result, "\n\n\n\n")
    })

    it("test with big input", function() {
        const justify = new Justify();

        const result = justify.justifyText(bigInputText)
        assert.equal(result, bigInputTextResult)
    })


})
