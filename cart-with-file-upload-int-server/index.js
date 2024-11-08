require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

const app = express();
const port = process.env.PORT || 5000;

const corsOptions = {
  origin: "https://cart-with-file-upload-int-client.vercel.app",
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_NAME}:${process.env.DB_PASS}@cluster0.0hgquea.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});
async function run() {
  try {

    const tasksCollection = client.db("cart-with-file").collection("data");

    // get tasks
    app.get("/tasks", async function (req, res) {
      const result = await tasksCollection.find().toArray();
      res.send(result);
    });

    // upload file
    app.post("/upload/:id", async function (req, res) {
      const taskId = new ObjectId(req.params.id);
      const fileUrl = req.file ? req.file.path : req.body.url;

      if (!fileUrl) {
        return res.status(400).send("File URL is missing.");
      }

      const fileDocument = {
        url: fileUrl,
        filename: req.body.filename || "Unnamed file",
        uploadedAt: new Date(),
      };

      try {
        const result = await tasksCollection.updateOne(
          { _id: taskId },
          { $push: { "stats.file_count": fileDocument } }
        );

        if (result.matchedCount === 0) {
          return res.status(404).send("Task not found.");
        }

        res.send({
          message: "File uploaded and URL saved to database.",
          file: fileDocument,
        });
      } catch (error) {
        console.error("Error saving file URL to database:", error);
        res.status(500).send("Error saving file URL to database.");
      }
    });

    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Cart-with-file is sitting");
});

app.listen(port, function () {
  console.log(`cart-with-file running ${port}`);
});
