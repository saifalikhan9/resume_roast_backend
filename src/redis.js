import { createClient } from "redis";

const redis = await createClient({url:process.env.REDIS_URL}).connect();


redis.on("connect", () => console.log("🔌 Redis: connecting..."));
redis.on("ready",   () => console.log("✅ Redis: ready"));
redis.on("error",   (err) => console.error("❌ Redis error:", err));
redis.on("end",     () => console.log("🔚 Redis: connection closed"));

export default redis;
