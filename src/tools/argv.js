const yargs = require('yargs');

module.exports = yargs
    // Training command / options
    .command('train', 'Train your markov decision chain on some data', args=>{
        args
        .option('separator', {
            alias: 'sep',
            description: 'The data separator in your training file.',
            type: 'string',
            default: '\n',
            required: false
        })
        .option('trainingFile', {
            alias: 'tfile',
            description: 'The training data file',
            type: 'string',
            required: true
        })
        .option('outputFile', {
            alias: 'ofile',
            description: 'The training output file (model file)',
            type: 'string',
            default: './model',
            required: false
        })
        .option('ngrams', {
            alias: 'ng',
            description: 'The number of ngrams you want to use.',
            type: 'number',
            default: 3,
            required: false
        })
        .option('endCharacter', {
            alias: 'e',
            description: 'The character which marks the end of an intent. "null" if you don\'t want one.',
            type: 'script',
            default: 'null',
            required: false
        })
    })
    // Running command / options
    .command('run', 'Run your markov decision chain on your model', args=>{
        args
        .option('modelFile', {
            alias: 'mfile',
            description: 'Your model file.',
            type: 'script',
            default: './model',
            required: false
        })
        .option('interactive', {
            alias: 'it',
            description: 'Whether it will open a prompt or not.',
            type: 'boolean',
            default: true,
            required: false
        })
        .option('text', {
            alias: 't',
            description: 'The text you pass in your markov decision chain. Cannot be used in interactive mode.',
            required: false
        })
        .option('length', {
            alias: 'l',
            description: 'The max length in ngram you want your generated text to be.',
            default: 50,
            type: 'number',
            required: false
        })
    })
    .help()
    .alias('help', 'h')
    .argv;