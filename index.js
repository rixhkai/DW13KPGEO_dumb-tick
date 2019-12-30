require("express-group-routes"); //initiate group route
const csp = require("express-csp-header");
const express = require("express"); // initiate express module/dependency
const app = express(); //declare new variable
const port = process.env.PORT || 5000;
const bodyParser = require("body-parser");
app.use(
 csp({
  policies: {
   "default-src": [csp.NONE],
   "img-src": [csp.SELF]
  }
 })
);
app.use(bodyParser.json());

app.use(function(req, res, next) {
 res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
 res.header("Access-Control-Allow-Headers", "*");
 next();
});

const {authenticated} = require("./middleware");

const home = require("./controllers/home");
const detail = require("./controllers/detailEvents");
const prof = require("./controllers/profile");
const pay = require("./controllers/payment");

app.group("/dumbtick", router => {
 router.get("/categories", home.cats); // get all Categories
 router.get("/category/:id/events", home.getCat); // get article by category
 router.get("/events?", home.today); // get event by today
 router.get("/events?", home.tomorrow); // get event by tomorrow
 router.get("/events?", home.search); // search event by title
 router.get("/event/:id", detail.show); //show event detail
 router.post("/order", detail.order); // make an order
 router.post("/event", home.store); // create event
 router.get("/profile/:id", prof.show); // get profile user
 router.get("/user/:id_user/favorites", prof.favorites); // get favorites
 router.put("/order/:id", pay.edit); // get favorites
 router.put("/orders?", pay.approved); // show my order approved
 router.post("/login", home.login); // login
 router.post("/register", home.register);
});

//when this nodejs app executed, it will listen to defined port
app.listen(port, () => console.log(`Listening on port ${port}!`));
