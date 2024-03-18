const JUSTIFY_SIZE = 80


export default class Justify {

    constructor() {}
    
    private justifyLine(line: string): string {
        const words = line.split(' ');
        const numberOfWord = words.length
        const spaceNeeded = JUSTIFY_SIZE - (line.length - numberOfWord - 1);
    
        const constantSpaceBetweenWord = Math.floor(spaceNeeded / (numberOfWord - 1));
        var extraSpaceNeeded = spaceNeeded % (numberOfWord - 1);
    
        var justifiedLine = "";
    
        for (var i = 0; i < numberOfWord; i++) {
            var extraSpace = extraSpaceNeeded > 0 ? 1 : 0;
            justifiedLine += words[i] + ' '.repeat(constantSpaceBetweenWord + extraSpace)
            extraSpaceNeeded--;
        }
    
        return justifiedLine.trim()
    }

    private justifyParagraph(paragraph: string): string {
        const words = paragraph.split(' ');
    
        var justifiedParagraph = "";
        var line = "";
        var numberOfWord = words.length;
    
        for (var i = 0; i < numberOfWord; i++) {
            if ((line.length + words[i].length) <= JUSTIFY_SIZE) {
                line += words[i] + ' ';
            } else {
                justifiedParagraph += this.justifyLine(line.trim()) + '\n';
                line = words[i] + ' ';
            }
        }
        justifiedParagraph += line.trim()
        return justifiedParagraph
    }

    justifyText(text: string): string {
        const paragraphs = text.split("\n");
        const numberOfParagraph = paragraphs.length
        var justifiedText = "";
    
        for (var i = 0; i < numberOfParagraph; i++) {
            if (i < numberOfParagraph - 1) {
                justifiedText += this.justifyParagraph(paragraphs[i]) + '\n'
            } else  {
                justifiedText += this.justifyParagraph(paragraphs[i])
            }
        }
    
        return justifiedText
    }
}