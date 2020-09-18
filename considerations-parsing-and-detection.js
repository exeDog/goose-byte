const fs = require("fs");

// Considerations
const sample = '"\x63\x68\x61\x72\x41\x74"';
console.log(`When encoded in source it is interpreted: ${JSON.parse(sample)}`);

const dataMalware2 = fs.readFileSync('./sample-malware-2.js', 'UTF-8');
console.log(`When read from a file it is not interpreted: ${dataMalware2}`);

const evaluated = eval(`${dataMalware2}`);
console.log(`Literal can be interpreted at runtime: ${evaluated}`);
console.log(`\tSafe as type: ${typeof(evaluated)}`);

// Parse the malware sample
const data = fs.readFileSync('./sample-malware-1.js', 'UTF-8');
const lines = data.split(/\r?\n/);
const re = new RegExp(/.*\\x[0-9][a-f0-9].*/)
const reInner = new RegExp(/"(\\x[0-9][a-f0-9].*?)"/)

for(line of lines) {
    if (re.test(line)) {
        const m = line.trim().match(reInner);
        console.log(m[1]);
        const evaluated2 = eval(`"${m[1]}"`);
        console.log(`Interpreted at runtime: ${evaluated2}`);
        console.log(`\tSafe as type: ${typeof(evaluated2)}`);
    }
}
