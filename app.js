const express = require("express");
const PORT = require("./config");
const userRoutes = require("./routes/user");
const morgan = require("morgan");

const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(userRoutes);

app.listen(PORT, () => {
  console.log(`Puerto corriendo en ${PORT}`);
});
