"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
class xiniFoldingRangeProvider {
    provideFoldingRanges(document, foldingContext, token) {
        const result = [];

        // 段
        const sectionRegex = /^\s*\[([^\]]+)\]/;
        // 键
        const keyRegex = /^\s*([^\[\\-=]+)\s*=/;

        const regionStartRegex = /^\s*\\\-+\s*region/i;
        const regionEndRegex = /^\s*\\\-+\s*endregion/i;
        var regionStartElements = [];

        let prevSecName = null;
        let prevSecLineStart = null;
        let prevSecLineEnd = null;
        let lastKeyLine = null;
        
        for (let line = 0; line < document.lineCount; line++) {
            const { text } = document.lineAt(line);

            const secMatched = text.match(sectionRegex);
            if (secMatched) {

                if (prevSecName != null)
                {
                    prevSecLineEnd = lastKeyLine;
                    const prevSecFoldingRange = new vscode.FoldingRange(prevSecLineStart, prevSecLineEnd, vscode.FoldingRangeKind.Region);
                    result.push(prevSecFoldingRange);
                }

                prevSecName = secMatched[1];
                prevSecLineStart = line;
                continue;
            }

            const keyMatched = text.match(keyRegex);
            if((prevSecName != null) && keyMatched){
                lastKeyLine = line;   
                continue;
            }

            const regionStartMatched = text.match(regionStartRegex);
            if (regionStartMatched)
            {
                regionStartElements.push(line);
                continue;
            }

            const regionEndMatched = text.match(regionEndRegex);
            if (regionEndMatched && regionStartElements.length>0)
            {
                const nearestStartLine = regionStartElements.pop();
                const foldingRange = new vscode.FoldingRange(nearestStartLine, line, vscode.FoldingRangeKind.Region);
                result.push(foldingRange);
                continue;
            }
        }

        // 记得：闭合最后一个段！
        if (prevSecName != null)
        {
            prevSecLineEnd = document.lineCount - 1;
            const prevSecFoldingRange = new vscode.FoldingRange(prevSecLineStart, prevSecLineEnd, vscode.FoldingRangeKind.Region);
            result.push(prevSecFoldingRange);
        }

        return result;
    }
}

exports.xiniFoldingRangeProvider = xiniFoldingRangeProvider;
//# sourceMappingURL=foldingRangeProvider.js.map