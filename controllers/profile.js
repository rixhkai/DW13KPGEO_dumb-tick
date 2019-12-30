const models = require("../models");
const cat = models.categories;
const eve = models.events;
const use = models.users;
const fav = models.favorites;

//show profile user
exports.show = (req, res) => {
 console.log("get specific one");
 use
  .findOne({
   where: {id: req.params.id},
   attributes: ["id", "name", "phone", "email", "image"]
  })
  .then(some => res.send(some))
  .catch(err => res.send(err));
};

//get favorites
exports.favorites = (req, res) => {
 console.log("get Favorites");
 fav
  .findOne({
   where: {user_id: req.params.id_user},
   attributes: ["id", "event_id", "user_id"],

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
