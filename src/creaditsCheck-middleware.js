// src/middleware/checkCredits.js
import redis from "./redis.js";

export const checkCredits = async (req, res, next) => {
  try {
    const forwarded = req.headers["x-forwarded-for"];
    console.log(forwarded);
    // It can contain multiple IPs, the first one is usually the real client
    const ip = forwarded
      ? forwarded.split(",")[0].trim()
      : req.socket.remoteAddress;

    console.log("Client IP:", ip);
    
    let credits = await redis.get(ip);

    if (!credits) {
      const initialCredits = 5;
      await redis.set(ip, initialCredits, { EX: 60 * 60 * 24 * 30 });
      credits = initialCredits;
      console.log(`🔄 Reset credits for ${ip}: ${credits}`);
    } else {
      credits = parseInt(credits, 10);
    }

    if (credits <= 0) {
      console.log(`❌ ${ip} has 0 credits`);
      return res
        .status(429)
        .json({ error: "Credit limit reached. Please try again later." });
    }

    // decrement credits
    await redis.decr(ip);
    const remaining = credits - 1;

    console.log(`✅ ${ip} used 1 credit. Remaining: ${remaining}`);

    req.userCredits = remaining; // pass to route
    next();
  } catch (err) {
    console.error("Redis error:", err);
    res.status(500).json({ error: "Server error" });
  }
};
