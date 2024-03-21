const mongoose =  require("mongoose");

const ProfessionalCpaSchema = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "User"
        },
        miles: { type: String, required: [true, 'postCode is missing'] },
        service: { type: String,required: [true, 'service is missing'] },
        postCodes: { type: String, required: [true, 'postCode is missing'] },
        website: { type: String },
        size: { type: String },
        companyName: { type: String }
        
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model('ProfessionalCpa', ProfessionalCpaSchema)