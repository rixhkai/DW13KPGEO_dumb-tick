const models = require("../models");
const cat = models.categories;
const eve = models.events;
const use = models.users;

///article by category
exports.getCat = (req, res) => {
 console.log("get Article by category");
 cat
  .findOne({
   where: {id: req.params.id},
   attributes: ["id", "name"],
   include: [
    {
     model: eve,
     as: "events",
     attributes: [
      "id",
      "title",
      "start_time",
      "end_time",
      "price",
      "description",
      "address",
      "url_maps",
      "image"
     ],
     include: [
      {
       model: use,
       as: "createdBy",
       attributes: ["id", "name", "phone", "email", "image"]
      }
     ]
    }
   ]
  })
  .then(some => res.send(some))
  .catch(err => res.send(err));
};
