const brain = require('brain.js')

const net = brain.NeuralNetwork({
    hiddenLayers: [3]
})

const dataset = [
    { input: { amount: 20, date: 1, location: 1 }, output: { fraudulent: 0 } },
    { input: { amount: 100, date: 2, location: 1 }, output: { fraudulent: 0 } },
    { input: { amount: 500, date: 3, location: 2 }, output: { fraudulent: 1 } },
    { input: { amount: 200, date: 4, location: 3 }, output: { fraudulent: 0 } },
    { input: { amount: 50, date: 5, location: 2 }, output: { fraudulent: 0 } },
];

brain.NeuralNetwork({
    hiddenLayers: [3]
}).train(dataset)

console.log('network')
console.log(net)