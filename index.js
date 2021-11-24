const express = require("express");
const cors = require("cors");

const app = express();
let buttonCount = 0;


app.use(cors());
app.use(express.static('public'));

app.use(express.json()); // When we want to be able to accept JSON.

// make sure to have 5 fortunes
app.get("/api/dailymotivation", (req, res) => {
    const motivation = ["Change is happening in your life, so go with the flow!",
                       "Don’t be discouraged, because every wrong attempt discarded is another step forward",
                       "Don’t let your limitations overshadow your talents.","Go for the gold today! You’ll be the champion of whatever.","If you wish to see the best in others, show the best of yourself.","It is honorable to stand up for what is right, however unpopular it seems.",
    ];
  
    // choose random fortunes
    let randomIndex = Math.floor(Math.random() * motivation.length);
    let randomMotivation = motivation[randomIndex];
  
    res.status(200).send(randomMotivation);
  
  });
  
  /// bottom of the code:
  

  const port = process.env.PORT || 3000

  app.listen(port, () => {
    console.log(`Listening on port ${port}`)
  })