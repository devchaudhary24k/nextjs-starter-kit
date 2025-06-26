import Redis from "ioredis";

const redisHost = "localhost";
const redisPort = 6379;

const redis = new Redis({
  host: redisHost,
  port: redisPort,
});

// Error handling
redis.on("error", (err) => {
  console.log("Redis connection error:", err);
});

export default redis;
