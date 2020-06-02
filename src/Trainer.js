const EventEmitter = require('events');
const fs = require('fs');
const MarkovDecisionChain = require('./MarkovDecisionChain.js')

module.exports = class Trainer extends EventEmitter {
    constructor({separator,
        outputFile,
        trainingFile,
        by}) {
            this.separator = separator
            this.outputFile = outputFile
            this.trainingFile = trainingFile
            this.by = by
    }
    readData() {
        return new Promise((res, rej)=>{
            // Read data
            const rawData = ''
            fs.createReadStream(this.outputFile)
            .on('data', (chunk) => {
                rawData += chunk.toString()
            })
            .on('close', ()=>{
                return res(rawData)
            })
            .on('error', err=>{
                throw Error(err)
            })
        })
    }
    async loadData() {
        // Retrieve raw data
        const rawData = await this.readData()
        // Split by separator
        return rawData.split(this.separator)
    }
    async train() {
        const dc = new MarkovDecisionChain({
            by: this.by
        })
        
        // Get all the data
        const data = await this.loadData()

        // Loop on data intents
        for(const [i, x] of data.entries()) {
            dc.train(x)
            this.emit('log', i*100/data.length)
        }
    }
}

