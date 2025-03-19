const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const PORT = process.env.PORT || 3004;

const app = express();
app.use(express.json());
app.use(cors());

mongoose.set("debug", true); // Enable Mongoose Debugging

mongoose.connect("mongodb+srv://ayan_salim:jBd2nL8dKy8wD1Gs@cluster0.0objn0q.mongodb.net/myDatabase?retryWrites=true&w=majority&appName=Cluster0")
  .then(() => {
    console.log("Connected to MongoDB successfully!");
    app.listen(PORT, () => {
      console.log(`Listening on ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });

const ItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  position: { type: String, required: true },
});
const Item = mongoose.model("Item", ItemSchema);

app.get("/api", (req, res) => {
  res.status(200).send({ response: "API worked.." });
});

app.get("/api/items", async (req, res) => {
  try {
    const items = await Item.find();
    res.status(200).send({ response: items });
  } catch (err) {
    res.status(500).send({ response: err.message });
  }
});

app.post("/api/items", async (req, res) => {
  try {
    const newItem = new Item(req.body);
    const savedItem = await newItem.save();
    res.status(200).send({ response: savedItem });
  } catch (err) {
    res.status(500).send({ response: err.message });
  }
});

app.put("/api/items/:id", async (req, res) => {
  try {
    const updatedItem = await Item.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).send({ response: updatedItem });
  } catch (err) {
    res.status(500).send({ response: err.message });
  }
});

app.delete("/api/items/:id", async (req, res) => {
  try {
    await Item.findByIdAndDelete(req.params.id);
    res.status(200).send({ response: "Deleted Successfully" });
  } catch (err) {
    res.status(500).send({ response: err.message });
  }
});
