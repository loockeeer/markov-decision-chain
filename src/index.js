const argv = require('./tools/argv.js')

const Trainer = require('./Trainer.js')
const Runner = require('./Runner.js')

function main() {
    if(argv._.includes('train')) {
        new Trainer({
            separator: argv.separator,
            outputFile: argv.outputFile,
            trainingFile: argv.trainingFile,
            ngrams: argv.ngrams
        })
        .on('log', percent=>{
            console.log(`Training : ${percent}%`)
        })
        .on('end', ()=>{
            console.log('Training done.')
        })
        .train()
        .then(instance=>{
            instance
            .save()
            .then(_=>{
                console.log('Model saved.')
                process.exit(0)
            })
        })
    } else if (argv._.includes('run')) {
        console.log('Running')
    }
}

main()