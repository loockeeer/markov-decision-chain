const EventEmitter = require('events')
const {fs = promises} = require('fs')

module.exports = class MarkovDecisionChain extends EventEmitter {
    constructor(modelData) {
        this.model = modelData
        /*
        {
            ngrams: 3,
            model: []
        }
        */
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
    prepareX(x, dict) {
        // Split all ngrams
    }
    runAll(data) {
        const dictionnary = this.generateDictionnary(data)
        for(const [i, x] of data.entries()) {
            this.run(x)
            this.emit('log', i*100/data.length)
        }
        this.emit('log', 'Done')
    }
    run(x) {
        const prepared = this.prepareX(x)

        // Run the Model
    }
}