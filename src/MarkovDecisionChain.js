const EventEmitter = require('events')
const fs = require('fs').promises
const ngramSplit = require('./tools/ngramSplit.js')
const random = require('./tools/chooseRandom.js')

module.exports = class MarkovDecisionChain extends EventEmitter {
    constructor(modelData) {
        super()
        this.model = modelData
        /*
        {
            ngrams: 3,
            model: [{value: 'tri', after: ['x', 'y', 'z', 'z', 'z']}]
        }
        */
    }
    trainAll(data) {
        for (const [i, x] of data.entries()) {
            this.train(x, data.length)
        }
        this.emit('log', 'Done')
    }
    train(x,count) {
        // Split data into ngrams
        const prepared = ngramSplit(x, this.model.ngrams)
        prepared[0] = "START" + prepared[0]
        // Loop on ngrams to generate the model
        for (const [i, ngram] of prepared.entries()) {
            this.emit('log', Math.floor(i * 100 / prepared.length / count)+"%")
            // Check if it is not the end of intent
            // Update ngram in the model
            if (i + 1 !== prepared.length) {
                const modelNgram = this.model.model.find(n => n.value === ngram)

                if (modelNgram) {
                    modelNgram.after.push(prepared[i + 1][this.model.ngrams-1] || "END")
                } else {
                    // Create ngram in the model
                    this.model.model.push({
                        value: ngram,
                        after: [prepared[i + 1][this.model.ngrams-1] || "END"] 
                    })
                }
            }
        }
    }
    async save(filename) {
        // Save model to file
        await fs.writeFile(filename, JSON.stringify(this.model, null, 2))
        return this
    }
    static async load(filename) {
        // Read model data and return new MarkovDecisionChain(model)
        const model_data = JSON.parse(await fs.readFile(filename))
        return new MarkovDecisionChain(model_data)
    }
    run(length, x) {
        if (!x) {
            let currentNgram = random(this.model.model.filter(ngram => {
                return ngram.value.startsWith('START')
            }))
            let text = currentNgram.value.replace('START', '');
            for (let i = 0; i < length - this.model.ngrams; i++) {
                // Generate one char after ngram and update current ngram, if end, then return
                const nextCharacter = random(currentNgram.after)
                if (nextCharacter === "END") {
                    return text
                } else {
                    text += nextCharacter
                    const nextNgram = currentNgram.value.replace('START', '').substring(1, this.model.ngrams)+nextCharacter
                    currentNgram = this.model.model.find(ngram => ngram.value === nextNgram)
                }
            }
            return text
        } else {
            // TODO
        }
    }
}