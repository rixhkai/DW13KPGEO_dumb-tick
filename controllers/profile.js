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
exports.favoritess = (req, res) => {
 console.log("get Favorites");
 fav
  .findOne({
   where: {user_id: req.params.id, event_id: req.params.id_event}
  })
  .then(some => res.send(some))
  .catch(err => res.send(err));
};

//get favorites
exports.favorites = (req, res) => {
 console.log("get Favorites");
 fav
  .findAll({
   where: {user_id: req.params.id},
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
      "img"
     ]
     //  include: [
     //   {
     //    model: use,
     //    as: "createdBy",
     //    attributes: ["id", "name", "phone", "email", "image"]
     //   }
     //  ]
    }
   ]
  })
  .then(some => res.send(some))
  .catch(err => res.send(err));
};

//edit profile
exports.edit = (req, res) => {
 console.log("get payment order by user");
 use
  .update(req.body, {
   where: {id: req.params.id}
  })
  .then(user => {
   const data = {user: req.body};
   res.send({user, data, message: "changed"});
  })
  .catch(err => res.send(err));
};

exports.addFavorite = (req, res) => {
 console.log("add to favorites");
 fav.create(req.body).then(favo => {
  res.send({
   message: "added",
   favo
  });
 });
};

//find favorites
exports.showsSpec = (res, req) => {
 fav
  .findOne({
   where: {user_id: req.body.userId, event_id: req.body.eventId}
  })
  .then(fav => {
   if (fav) {
    res.send({fav});
   } else {
    res.send({
     error: true
    });
   }
  })
  .catch(err => res.send(err));
};

//delete favorite
exports.deleteFavorite = (req, res) => {
 console.log("delete favorite");
 fav
  .destroy({
   where: {user_id: req.params.id, event_id: req.params.id_event}
  })
  .then(favo => {
   res.send({fav: false});
  });
};
