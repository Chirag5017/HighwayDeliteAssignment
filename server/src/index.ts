import app from "./app";
import connectDB from "./db/connectDB"
import dotenv from "dotenv";

dotenv.config({path : "./.env"});
const PORT = process.env.PORT

const startServer = () => {
    try {
        app.listen(PORT, async () => {
            await connectDB();
            console.log("Server is running on port", PORT);
        })
    } catch(error) {
        console.error("Error starting the server:", error);
    }
}
startServer();