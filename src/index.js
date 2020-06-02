const argv = require('./tools/argv.js')

const Trainer = require('./Trainer.js')
const Runner = require('./Runner.js')

function main() {
    if(argv._.includes('train')) {
        const trainer = new Trainer({
            separator: argv.separator,
            outputFile: argv.outputFile,
            trainingFile: argv.trainingFile,
            by: argv.by
        })
        trainer
        .on('log', percent=>{
            console.log(`Training : ${percent}%`)
        })
        .on('end', ()=>{
            console.log('Training done.')
        })
        .train()
    } else if (argv._.includes('run')) {
        console.log('Running')
    }
}

main()