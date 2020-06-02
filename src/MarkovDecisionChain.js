const EventEmitter = require('events')

module.exports = class MarkovDecisionChain extends EventEmitter {
    constructor(modelData) {
        // ModelData has 'by' key with 'word' or 'character'
        this.model = modelData
        this._dictionnary = []
    }
    train(x) {

    }
    save(file) {

    }
    static load(file) {
        // Read model data and return new MarkovDecisionChain(model)
    }
    prepareX(x, dict) {
        if(this.model.by === 'word') {
            const splitted = x.split(/\W/)
            return splitted.map(s=>{
                if(!dict.find(x=>x.value===s)) {
                    return -1
                }
            })
        } else if (this.model.by === 'character') {
            return x.split(/./)
        }
    }
    generateDictionnary(data) {
        // Generate Dictionnary
        this.emit('log', 'Generating Dictionnary')
        if(this.model.by === 'word') {
            const dictionnary = [...new Set(data.map(x=>x.split(/\W/)))].map((x,i)=>({
                index: i,
                value: x
            }))
        } else if(this.model.by === 'character') {
            const dictionnary = Array(256)
                                .fill(256)
                                .map((x, y) => String.fromCharCode(x + y))
                                .map((x,i)=>({
                                    index: i,
                                    value: x
                                }))
        }
        this._dictionnary = dictionnary
        this.emit('log', 'Dictionnary Generated')
        return dictionnary
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