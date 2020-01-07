const models = require("../models");
const cat = models.categories;
const eve = models.events;
const use = models.users;
const ord = models.orders;

//show event detail with all attribute relate to article table
exports.show = (req, res) => {
 console.log("get specific one");
 eve
  .findOne({
   where: {id: req.params.id},
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
   ],
   include: [
    {model: use, as: "createdBy"},
    {
     model: cat,
     as: "category"
    }
   ]
  })
  .then(some => res.send(some))
  .catch(err => res.send(err));
};

///post order
exports.order = (req, res) => {
 ord.create(req.body).then(some => {
  res.send({
   message: "success",
   some
  });
 });
};
