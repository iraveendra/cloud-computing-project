import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import philipsRouter from "./routes/philips.routes.js";
import lifxRouter from "./routes/lifx.routes.js";
import properties from './config.js';

import fs from 'fs';
import swaggerUi from 'swagger-ui-express';

// Read swagger.json file synchronously and parse it as JSON
const swaggerDocument = JSON.parse(fs.readFileSync('./swagger.json'));

dotenv.config();
const port = properties.port;
const app = express();
app.use(cors());
// app.use(axios);
app.use(express.json({ limit: "50mb" }));

// Serve Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get("/", (req, res) => {
    res.send({ message: "Hello World!" });
});

app.use("/philips", philipsRouter);
app.use("/lifx", lifxRouter);



const startServer = async () => {
    try {

        const configModule = await import('./config.json', {
            assert: {
                type: 'json'
            }
        });
        const properties = configModule.default;

        // Use properties from the loaded configuration
        const port = properties.port;

        app.listen(port, () =>
            console.log(`Server started on port http://localhost:${port}`),
        );
    } catch (error) {
        console.log(error);
    }
};

startServer();
