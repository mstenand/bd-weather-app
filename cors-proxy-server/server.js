import cors from "cors";
import express, { json } from "express";
import { createClient } from 'redis';
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(cors());
app.use(json());

let redisClient;
(async () => {
    redisClient = createClient();
    redisClient.on('error', error => console.log('Redis Client Error: ', error));
    await redisClient.connect();
})();

const PORT = process.env.PORT;
const YR_URL = process.env.YR_URL;
const YR_SITE_NAME = process.env.YR_SITE_NAME;

app.listen(PORT, () => {
    console.log(`Server listening on localhost:${PORT}`)
})

app.get("/", (_, res) => {
    res.status(200).json({ message: "I am an Express Server!" });
});

app.get("/yr-forecast", getYrForecast, (_, res) => {
    res.status(200).json(res.locals.result);
});

async function getYrForecast(req, res, next) {
    let url = YR_URL + "?";
    if (req.query.altitude !== undefined) url += "altitude=" + req.query.altitude + "&";
    url += "lat=" + req.query.lat + "&";
    url += "lon=" + req.query.lon;

    const options = {
		method: "GET",
		headers: {
			"User-Agent": YR_SITE_NAME
		}
	};

    try {
        const response = await fetch(url);

        switch (response.status) {
            case 200: {
                const data = await response.json();
                await redisClient.set("yr_response", JSON.stringify(data));
                await redisClient.save();
                res.locals.result = data;
                res.status(200)
            } break;
            case 304: {
                const cachedData = await redisClient.get("yr_response");
                const data = JSON.parse(cachedData);
                res.locals.result = data;
                res.status(200)
            } break;
            default:
                res.status(200);
                break;
        }
    } catch (error) {
        console.log("Error: ", error);
        res.status(400);
    }

    next();
}
