const express = require('express');
const router = express.Router();

const handleErrorAsync = func => async (req, res, next) => {
  try {
      await func(req, res, next);
  } catch (error) {
      await next(error);
  }
}




const getDailyMotivation = (req, res) => {
  const motivation = ["Change is happening in your life, so go with the flow!",
                     "Don’t be discouraged, because every wrong attempt discarded is another step forward",
                     "Don’t let your limitations overshadow your talents.","Go for the gold today! You’ll be the champion of whatever.","If you wish to see the best in others, show the best of yourself.","It is honorable to stand up for what is right, however unpopular it seems.",
  ];

  // choose random fortunes
  let randomIndex = Math.floor(Math.random() * motivation.length);
  let randomMotivation = motivation[randomIndex];

  res.status(200).send(randomMotivation);
};


const areYouDoneYet = (req, res) => {
  const tasks = req.body;

  res.status(200).send("clever response here");
};

router.get('/dailymotivation', handleErrorAsync(getDailyMotivation));
router.post('/areyoudoneyet', handleErrorAsync(areYouDoneYet));


  module.exports=router;