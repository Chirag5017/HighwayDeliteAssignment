import app from "./app";
import connectDB from "./db/connectDB"
import { ENV } from "./config/env";

const PORT = ENV.PORT || 5000

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