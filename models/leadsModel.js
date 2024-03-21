const mongoose = require("mongoose");

const LeadsSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
  summary: {
    type: String,
  },
  issue: {
    type: String,
  },
  requirements: {
    type: String,
  },
  deadline: {
    type: Date,
  },
  contact: {
    type: String,
  },
  issues: {
    type: [String],
    default:[]
  },
},
{
  timestamps: true
}
);

module.exports = mongoose.model('Leads', LeadsSchema)