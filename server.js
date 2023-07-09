require("dotenv").config();
const app = require("./app");
const dbConnect = require("./config/db");

const port = process.env.PORT;

const start = () => {
    try {
        dbConnect(process.env.DB_URL);
        app.listen(port, () => {
            console.log(`Server is running: http://localhost:${port}`);
        });
    } catch (error) {
        console.log("Server has something wrong" + error);
    }
};

start();
