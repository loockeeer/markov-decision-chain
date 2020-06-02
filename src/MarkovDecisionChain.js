module.exports = class MarkovDecisionChain {
    constructor(modelData) {
        // ModelData has 'by' key with 'word' or 'character'
        this.model = modelData
    }
    train(x) {

    }
    save(file) {

    }
    static load(file) {
        // Read model data and return new MarkovDecisionChain(model)
    }
    prepareX(x) {
        if(this.model.by === 'word') {
            return x.split(/\W/)
        } else {
            return x.split(/./)
        }
    }
    run(x) {
        // Prepare x
        const prepared = this.prepareX(x)
        // Run model with x
        // RUN
    }  
}