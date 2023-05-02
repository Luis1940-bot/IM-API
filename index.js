require("dotenv").config();
const server = require("./src/servers");
const { conn } = require("./src/databases/mysql.js");

const { PORT } = process.env;

const port = PORT || 3001;
let message = "%s listening at " + port;
conn
  .sync({ force: true })
  .then(() => {
    server.listen(port, () => {
      console.log(message);
    });
  })
  .catch((err) => {
    console.error("The next error happens on the root:", err);
  });
