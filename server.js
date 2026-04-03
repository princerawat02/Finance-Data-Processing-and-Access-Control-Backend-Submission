import express from "express";
const app = express();
const PORT = 3000;

app.use(express.json());

import userRoutes from "./src/routes/userRoutes.js";
import recordRoutes from "./src/routes/recordRoutes.js";

app.use("/users", userRoutes);
app.use("/records", recordRoutes);

app.get("/", (req, res) => {
  res.send({ message: "Server is running." });
});

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
