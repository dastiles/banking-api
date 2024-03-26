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
        lisencingRegistration: { type: String },
        lisencingState: { type: String},
        website: { type: String },
        size: { type: String },
        companyName: { type: String },
        accountStatus: { type: String, default: 'NOTACTIVE' },
        profileUrlId:{ type: String, default: '/user.png' }
        
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model('ProfessionalCpa', ProfessionalCpaSchema)