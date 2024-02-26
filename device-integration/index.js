import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import philipsRouter from "./routes/philips.routes.js";
import lifxRouter from "./routes/lifx.routes.js";
import properties from "./config.json" assert { type: 'json' }


dotenv.config();
const port = properties.port;
const app = express();
app.use(cors());
// app.use(axios);
app.use(express.json({ limit: "50mb" }));

app.get("/", (req, res) => {
    res.send({ message: "Hello World!" });
});

app.use("/philips", philipsRouter);
app.use("/lifx", lifxRouter);

const startServer = async () => {
    try {

        app.listen(port, () =>
            console.log(`Server started on port http://localhost:${port}`),
        );
    } catch (error) {
        console.log(error);
    }
};

startServer();
