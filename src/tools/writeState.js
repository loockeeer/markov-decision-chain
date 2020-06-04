const readline = require('readline');

module.exports = (p) => {
    readline.clearLine(process.stdout, 0);
    readline.cursorTo(process.stdout, 0, null);
    let text = `Training : ${p}`;
    process.stdout.write(text);
}
