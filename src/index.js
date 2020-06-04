const argv = require('./tools/argv.js')

const Trainer = require('./Trainer.js')
const Runner = require('./Runner.js')
const MarkovDecisionChain = require('./MarkovDecisionChain.js')
const writeState = require('./tools/writeState.js')

function main() {
    if(argv._.includes('train')) {
        new Trainer({
            separator: argv.separator,
            outputFile: argv.outputFile,
            trainingFile: argv.trainingFile,
            ngrams: argv.ngrams
        })
        .on('log', log=>{
            writeState(log)
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
        MarkovDecisionChain.load(argv.modelFile).then(instance=>{
            console.log(instance.run(argv.length))
        })
    }
}

main()