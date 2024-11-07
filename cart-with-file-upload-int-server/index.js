const express = require("express");
require("dotenv").config();
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const multer = require("multer");

const app = express();
const port = process.env.PORT || 5000;

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});

const upload = multer({ storage });

const corsOptions = {
  origin: process.env.BASE_URL,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use("/uploads", express.static("uploads"));

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
    app.post("/upload/:id", upload.single("file"), async (req, res) => {
      const taskId = new ObjectId(req.params.id);

      if (!req.file) {
        return res.status(400).send("No file uploaded.");
      }

      const fileUrl = `${req.protocol}://${req.get("host")}/uploads/${encodeURIComponent(req.file.filename)}`;
      
      const fileDocument = {
        url: fileUrl,
        filename: req.file.originalname,
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

app.listen(port, function () {
  console.log(`cart-with-file running ${port}`);
});
