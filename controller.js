const express = require("express");
const router = express.Router();
// this is in able ing the express routing module. (express is my library to host my frontend and backend. )

// This is the middle ware(gets injected into our calls) that I used to gracefully handles errors in API calls. 
const handleErrorAsync = (func) => async (req, res, next) => {
  try {
    await func(req, res, next);
  } catch (error) {
    await next(error);
  }
};


// This is returns a random item form the motivation variable. 
const getDailyMotivation = (req, res) => {
  const motivation = [
    "Take 5, to do something that will make you look good, if you look good you feel good.",
    "Don’t be discouraged, make plans on the steps you need to take to move forward",
    "List something small.",
    "Take one step at a time",
    "If you wish to see the best in others, show the best of yourself.",
    "Go for a walk, and get some fresh air.",
    "Get up and move your body.",
  ];

  
  let randomIndex = Math.floor(Math.random() * motivation.length);
  let randomMotivation = motivation[randomIndex];

  res.status(200).send(randomMotivation);
};


// This tells the font end if the list is complete, after checking the list. 
const areYouDoneYet = (req, res) => {
  const tasks = req.body;
  const incompleteTasks = tasks.filter((x) => !x.complete);
  res
    .status(200)
    .send(
      incompleteTasks.length == 0
    );
};


// This defines the routs and methods used by this controller. both are HTTP request. 
router.get("/dailymotivation", handleErrorAsync(getDailyMotivation));
router.post("/areyoudoneyet", handleErrorAsync(areYouDoneYet));

module.exports = router;
