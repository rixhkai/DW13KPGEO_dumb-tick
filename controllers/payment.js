const models = require("../models");
const Sequelize = require("sequelize");
const cat = models.categories;
const eve = models.events;
const use = models.users;
const ord = models.orders;
const Op = Sequelize.Op;

exports.store = (req, res) => {
 console.log("make an order");
 ord.create(req.body).then(order => {
  res
   .send({
    message: "success",
    order
   })
   .catch(err => res.send(err));
 });
};

exports.showPayment = (req, res) => {
 console.log("get payment order by user");
 ord
  .findAll({
   where: {user_id: req.params.id, status: {[Op.or]: ["pending", "confirmed"]}},
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
      "img"
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
  .then(some => {
   //  console.log(some);
   res.send(some);
  })
  .catch(err => res.send(err));
};

//edit order
exports.edit = (req, res) => {
 console.log("get payment order by user");
 ord
  .update(
   {
    status: req.body.status
   },
   {
    where: {user_id: req.params.id, id: req.body.id},
    attributes: ["id", "user_id", "status"]
   }
  )
  .then(order => {
   if (order) {
    const userId = {user_id: req.params.id};
    res.send({order, userId, message: req.body.status});
   } else {
    res.send({
     error: true,
     message: "user Id not found"
    });
   }
  })
  .catch(err => res.send(err));
};

// attributes: [
//   "id",
//   "event_id",
//   "user_id",
//   "quantity",
//   "total_price",
//   "status",
//   "attachment"
//  ],
//  include: [
//   {
//    model: eve,
//    as: "events",
//    attributes: [
//     "id",
//     "title",
//     "start_time",
//     "end_time",
//     "price",
//     "description",
//     "address",
//     "url_maps",
//     "img"
//    ],
//    include: [
//     {
//      model: use,
//      as: "createdBy",
//      attributes: ["id", "name", "phone", "email", "image"]
//     }
//    ]
//   }
//  ]

///get my ticket
exports.approved = (req, res) => {
 console.log("get my ticket");
 ord
  .findAll({
   where: {user_id: req.params.id, status: req.query.status},
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
      "img"
     ],
     include: [
      {model: cat, as: "category", attributes: ["id", "name", "image"]},
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

// req query pending
exports.showPayments = (req, res) => {
 console.log("get payment order by user");
 ord
  .findAll({
   where: {user_id: req.params.id, status: {[Op.or]: ["pending", "confirmed"]}},
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
      "img"
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
  .then(some => {
   //  console.log(some);
   res.send(some);
  })
  .catch(err => res.send(err));
};
