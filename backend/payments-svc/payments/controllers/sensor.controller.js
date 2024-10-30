import { catchAsync } from "../utils/catchAsync.js";
import { ApiError } from "../utils/APiError.js";
import { sensorQueue } from "../jobs/queues/queue.js";
import { removeConfig } from "../config/bullmq.js";

const sensorData = catchAsync(async (req, res) => {
  const job = await sensorQueue.add("sensor data", req.body, removeConfig);
  return res.status(202).json({
    status: "success",
    message: `job with id: ${job.id} received for processing`,
  });
});

export default { sensorData };
