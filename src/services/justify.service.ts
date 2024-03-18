import Justify from "../utils/justify"


export default class JustifyService {

    private justify: Justify;

    constructor() {
        this.justify = new Justify();
    }
    
    justifyText(userEmail: string, textToJustify: string): string {
        //TODO
        /*
        -check length of the new text
        -check previous wordCount with new word to justify
        -return 402 Payment Required if newWordCount + previous wordCount > 80 000
        -justify the text
        -save the newWordCount + previous wordCount
        -return justified text
        */
        const justifiedText = this.justify.justifyText(textToJustify)
        console.log("\n\njustfied text : \n" + justifiedText)
        return justifiedText
    }
}

