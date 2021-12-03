const express = require("express");
const router = express.Router();

const handleErrorAsync = (func) => async (req, res, next) => {
  try {
    await func(req, res, next);
  } catch (error) {
    await next(error);
  }
};

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

  // choose random fortunes
  let randomIndex = Math.floor(Math.random() * motivation.length);
  let randomMotivation = motivation[randomIndex];

  res.status(200).send(randomMotivation);
};

const areYouDoneYet = (req, res) => {
  const tasks = req.body;
  const incompleteTasks = tasks.filter((x) => !x.complete);
  res
    .status(200)
    .send(
      incompleteTasks.length > 0 ? "Are you really done?" : "Yes! You did it!"
    );
};

router.get("/dailymotivation", handleErrorAsync(getDailyMotivation));
router.post("/areyoudoneyet", handleErrorAsync(areYouDoneYet));

module.exports = router;
