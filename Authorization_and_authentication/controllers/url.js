import { nanoid } from "nanoid";
import URL from "../models/url.js";

// Create new short URL
export async function handleGenerateNewShortURL(req, res) {
    const body = req.body;

    if (!body.url) {
        return res.status(400).json({ error: "URL is Required" });
    }

    const shortId = nanoid(8);
    await URL.create({
        shortId: shortId,
        redirectURL: body.url,
        visitHistory: [],
    });

    const allUrls = await URL.find({});
    return res.render("home", {
        id: shortId,
        urls: allUrls,
    });
}

// Get click analytics for a shortId
export async function handleGetAnalytics(req, res) {
    const shortId = req.params.shortId;

    const result = await URL.findOne({ shortId });

    if (!result) {
        return res.status(404).json({ error: "Short URL not found" });
    }

    return res.json({
        totalClicks: result.visitHistory.length,
        analytics: result.visitHistory,
    });
}
