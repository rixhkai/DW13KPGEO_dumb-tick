const models = require("../models");
const jwt = require("jsonwebtoken");
const cat = models.categories;
const eve = models.events;
const use = models.users;

//Get Categories
exports.cats = (req, res) => {
 console.log("get all categories");
 cat
  .findAll({
   attributes: ["id", "name"]
  })
  .then(some => res.send(some))
  .catch(err => res.send(err));
};

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
      "title",
      "category_id",
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

///get today events
exports.today = (req, res) => {
 //  const today = Date.now();
 console.log("get today events" + req.query.start_time);
 eve
  .findAll({
   where: {start_time: req.query.start_time},
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
  })
  .then(some => res.send(some))
  .catch(err => res.send(err));
};

//get events by tomorrow
exports.tomorrow = (req, res) => {
 //  const today = Date.now();
 //  const tom = new Date(today.getTime() + 86400000);
 //  const tomorrow = tom.toLocaleDateString();
 //  console.log(tomorrow);
 eve
  .findAll({
   where: {start_time: req.query.start_time},
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
  })
  .then(some => res.send(some))
  .catch(err => res.send(err));
};

///search event by title
exports.search = (req, res) => {
 //  const title = req.body;
 console.log("get events by title");
 eve
  .findAll({
   where: {title: req.query.title},
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
  })
  .then(some => res.send(some))
  .catch(err => res.send(err));
};

///////////POSTING or Create \\\\\\\\\\\

///create event or add events
exports.store = (req, res) => {
 eve.create(req.body).then(some => {
  res.send({
   message: "success",
   some
  });
 });
};

//create categories
exports.store = (req, res) => {
 cat.create(req.body).then(some => {
  res
   .send({
    message: "success",
    some
   })
   .catch(err => res.send(err));
 });
};

//login
exports.login = (req, res) => {
 ///check if username and pass match in database
 const username = req.body.username;
 const password = req.body.password;
 use
  .findOne({where: {username, password}, attributes: ["username", "password"]})
  .then(user => {
   if (user) {
    const token = jwt.sign({id: user.id}, "bakamono");
    res.send({user, token});
   } else {
    res.send({
     error: true,
     message: " wrong email or password!!"
    });
   }
  });
};

// exports.register = (req, res) => {
//  // check if email in database if match
//  const email = req.body.email;
//  const password = req.body.password;
//  // const { email, password } = req.body;
//  // const user = new User({ email, password });
//  // user.save(function(err) {
//  //   if (err) {
//  //     res.status(500)
//  //       .send("Error registering new user please try again.");
//  //   } else {
//  //     res.status(200).send("Welcome to the club!");
//  //   }
//  // });
//  user.create({where: {email, password}}).then(user => {});
// };

///cregister
exports.register = (req, res) => {
 use.create(req.body).then(some => {
  const token = jwt.sign({id: some.id}, "bakamono");
  res.send({
   message: "success",
   token,
   some
  });
 });
};
