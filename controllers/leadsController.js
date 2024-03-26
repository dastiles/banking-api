const expressAsyncHandler = require("express-async-handler");
const Leads= require("../models/leadsModel");
const ProfessionalCpa = require("../models/professionalCpa");

const getLeads = expressAsyncHandler(async (req, res) => {
  try {
    let userIssue = await ProfessionalCpa.find({ user: req.user.id }).populate('user');
      if (userIssue) {
          const { service } = userIssue[0]
          console.log(userIssue)
      let lead = await Leads.find({ issues: service}).populate(
        {
            path: 'user',
            select: '-password' // Exclude the password field
         }
      );
     
      res.status(200);
      res.json(lead);
    }
      res.status(400);
      res.json({message:'no user found'});
   
  } catch (error) {
    console.log(error);
    res.status(400);
    throw new Error(error);
  }
});

const getAllLeads = expressAsyncHandler(async (req, res) => {
    try {
     
      let leads = await Leads.find()
      .populate({
         path: 'user',
         select: '-password' // Exclude the password field
      })
      .sort({ createdAt: -1 });
       
        res.status(200);
        res.json(leads);
     
    } catch (error) {
      console.log(error);
      res.status(400);
      throw new Error(error);
    }
  });

module.exports = {
    getLeads,
    getAllLeads,
};
