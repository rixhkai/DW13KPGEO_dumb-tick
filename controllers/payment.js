const models = require("../models");
const cat = models.categories;
const eve = models.events;
const use = models.users;
const ord = models.orders;

//get order
exports.edit = (req, res) => {
 console.log("get payment order by user");
 ord
  .update({
   where: {user_id: req.params.id},
   attributes: [
    "id",
    "event_id",
    "user_id",
    "quantity",
    "total_price",
    "status",
    "attachment"
   ],
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

///get my ticket
exports.approved = (req, res) => {
 console.log("get my ticket");
 ord
  .findAll({
   where: {status: req.query.status},
   attributes: [
    "id",
    "event_id",
    "user_id",
    "quantity",
    "total_price",
    "status",
    "attachment"
   ],
   include: [
    {
     model: eve,
     as: "event",
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
      {model: cat, as: "category", attributes: ["id", "name"]},
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
