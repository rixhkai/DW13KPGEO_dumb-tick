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
 res.header("Access-Control-Allow-Methods", "*");
 next();
});

const {authenticated} = require("./middleware");

const home = require("./controllers/home");
const detail = require("./controllers/detailEvents");
const prof = require("./controllers/profile");
const pay = require("./controllers/payment");

app.group("/dumbtick", router => {
 router.get("/categories", home.cats); // get all Categories
 router.get("/category/:id/events", home.showEvents); // get article by category
 router.get("/events", home.showAll);
 router.get("/events?", home.today); // get event by today
 //  router.get("/eventss?", home.tomorrow); // get event by tomorrow
 //  router.get("/events?", home.search); // search event by title
 //get Events
 router.get("/event/:id", detail.show); //show event detail
 router.post("/order", authenticated, detail.order); // make an order
 router.post("/addevent", authenticated, home.AddEvent); // create event
 router.get("/profile/:id", prof.show); // get profile user
 router.put("/profile/:id", prof.edit); //edit profile

 router.get("/user/:id/favorites", prof.favorites); // get favorites in profile
 router.post("/favorite", prof.addFavorite); // add to favorites
 router.delete("/favorite/:id:id_event", prof.deleteFavorite); //delete favorites
 //  router.post("/fav", prof.showsSpec); // fetch favorites
 router.get("/fav/:id:id_event", prof.favoritess); // fecth favorites

 router.post("/order", pay.store); // make an order
 router.get("/payment/:id", pay.showPayment); // show pending payment
 router.put("/order/:id", pay.edit); // edit payment
 router.get("/orders/:id?", pay.approved); // show my order approved
 router.post("/login", home.login); // login
 router.post("/register", home.register); //register
});

//when this nodejs app executed, it will listen to defined port
app.listen(port, () => console.log(`Listening on port ${port}!`));
