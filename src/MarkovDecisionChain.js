const EventEmitter = require('events')
const {fs = promises} = require('fs')
const ngramSplit = require('./tools/ngramSplit.js')

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
        // Split data into ngrams
        const prepared = [...ngramSplit(x, this.model.ngrams), 'EOI_END_OF_INTENT']
        // Loop on ngrams to generate the model
        for(const [i, ngram] of prepared.entries()) {
            // Check if it is not the end of intent
            if(ngram !== "EOI_END_OF_INTENT") {
                // Update ngram in the model
                const modelNgram = this.model.model.find(n=>n.value === x)
                if(modelNgram) {
                    modelNgram.after.push(prepared[i+1])
                } else {
                    // Create ngram in the model
                    this.model.model.push({
                        value: x,
                        after: [prepared[i+1]]
                    })
                }
            }
        }
    }
    async save(filename) {
        // Save model to file
        await fs.writeFile(filename, JSON.stringify(this.model))
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