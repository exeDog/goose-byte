const fs = require("fs");
const {v4: uuidv4} = require('uuid');
const keywords = new Set(["charAt","push","join","pop","fromCharCode","true","false","string","setMilliseconds","getMilliseconds","toUTCString","cookie", "input", "textarea", "function" ,"slice" ,"split" ,"charCodeAt"]);
class ThreatDetectEncoded {

    determine(filenameOriginal, size, data) {
        const tempFilePath = this.writeTmpFile(data);
        const lines = this.getLines(tempFilePath);
        const threat = this.parseAndDetect(lines);

        return {
            "file": filenameOriginal,
            "size": size,
            "detected": {
                "threat": threat
            }
        };
    }

    parseAndDetect(lines) {
        const re = new RegExp(/.*\\x[0-9][a-f0-9].*/);
        const reInner = new RegExp(/"(\\x[0-9][a-f0-9].*?)"/);

        let threat = false;

        for (let line of lines) {
            if (re.test(line)) {
                const m = line.trim().match(reInner);
                const evaluated2 = eval(`"${m[1]}"`);
                // console.log(keywords.has(evaluated2));
                if(keywords.has(evaluated2)) {
                    threat = true;
                    break;
                }
            }
        }
        return threat;
    }

    writeTmpFile(data) {
        const filename = uuidv4();
        const filenameTmp = `/tmp/${filename}`;
        fs.writeFileSync(filenameTmp, data);
        console.log(`wrote ${filename}`);
        return filenameTmp;
    }

    getLines(filepath) {
        const filedata = fs.readFileSync(filepath, 'UTF-8');
        const lines = filedata.split(/\r?\n/);
        // const re = new RegExp(/.*\\x[0-9][a-f0-9].*/);
        // const reInner = new RegExp(/"(\\x[0-9][a-f0-9].*?)"/);
        return lines;
    }
}

module.exports = ThreatDetectEncoded;
