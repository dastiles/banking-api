const expressAsyncHandler = require("express-async-handler");
const ProfessionalCpa = require("../models/professionalCpa");


const getCpas = expressAsyncHandler(async (req, res) => {
    try {
        let cpa = await ProfessionalCpa.find({ user: req.user.id }).populate('user')
        console.log(cpa)
        res.status(200)
        res.json(cpa)
    } catch (error) {
        console.log(error)
        res.status(400)
        throw new Error(error)
    }
})

module.exports = {
    getCpas
}