import { Router } from "express";
import { addJob } from "../lib/queue/addJob";
import { BadRequestError } from "../lib/errors";

const baseRouter = Router();

// Submit a job to the queue
baseRouter.post("/job", async (req, res) => {
  const { x, y, name } = req.body;

  if (x === undefined || y === undefined || name === undefined) {
    throw new BadRequestError("Missing required parameters");
  }

  const job = await addJob({
    name,
    data: { x: parseInt(x), y: parseInt(y) },
  });

  res.status(200).json({ msg: "Job submitted", job_id: job.id });
});

// Health check that API is up and running
baseRouter.get("/health", (req, res) => {
  res.status(200).json({ msg: "OK" });
});

export default baseRouter;
