const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.static("public"));
app.use(express.json()); // When we want to be able to accept JSON.
app.use("/api", require("./controller"));

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
