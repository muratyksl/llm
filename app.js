const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.post("/llm", async (req, res) => {
  try {
    const { url } = req.query;
    if (!url) {
      return res.status(400).json({
        message: "Url is required",
      });
    }
    console.log("parameters", req.body);
    const { data, status } = await axios.post(
      url,
      { ...req.body.body },
      { headers: { ...req.body.headers } }
    );
    res.status(status).json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
