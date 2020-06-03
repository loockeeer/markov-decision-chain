const EventEmitter = require('events')
const {fs = promises} = require('fs')

module.exports = class MarkovDecisionChain extends EventEmitter {
    constructor(modelData) {
        this.model = modelData
        /*
        {
            ngrams: 3,
            model: [{value: 'tri', after: ['x', 'y', 'z', 'z', 'z']}]
        }
        */
    }
    trainAll(data) {
        for(const [i, x] of data.entries()) {
            this.train(x)
            this.emit('log', i*100/data.length)
        }
        this.emit('log', 'Done')
    }
    train(x) {
        // Train the model
    }
    async save(filename) {
        // Save model to file
        await fs.writeFile(filename, null,  JSON.stringify(this.model))
        return this
    }
    async static load(filename) {
        // Read model data and return new MarkovDecisionChain(model)
        const model_data = JSON.parse(await fs.readFile(filename))
        return new MarkovDecisionChain(model_data)
    }
    run(length, x) {
        if(!x) {
            let text = '';
            for(let i = 0;i<length;i++) {
                // Generate one char after ngram and update current ngram, if end, then return
            }
            return text
        } else {
            // TODO
        }
    }
}