import "dotenv/config";
import app from "./app.js";
import { syncDB } from "./models/indexModels.js";

const PORT = process.env.PORT || 8000;
const HOSTNAME = process.env.HOSTNAME || "localhost";

// Start the server
(async () => {
    await syncDB();
    app.listen(PORT, HOSTNAME, () => {
        console.log(`Server is running on http://${HOSTNAME}:${PORT}`);
    });
})();
