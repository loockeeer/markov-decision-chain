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
        .option('by', {
            description: 'Use a word dictionnary or a character dictionnary.',
            type: 'string',
            default: 'word',
            required: false
        })
        .option('dictionnaryFile', {
            alias: 'dict',
            description: 'The file for the dictionnary',
            type: 'string',
            default: './dictionnary',
            required: false
        })
        .choices('by', ['word', 'character'])
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
        .option('dictionnaryFile', {
            alias: 'dict',
            description: 'The dictionnary file',
            default: './dictionnary',
            required: false
        })
    })
    .help()
    .alias('help', 'h')
    .argv;