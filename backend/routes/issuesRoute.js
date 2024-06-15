import express from "express";
import { Issue } from "../models/issueModel.js";

const router = express.Router();

// Get all issues
router.get("/", async (req, res) => {
  try {
    const issues = await Issue.find();
    res.send(issues);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// Create issue
router.post("/", async (req, res) => {
  try {
    const newIssue = new Issue(req.body);
    await newIssue.save();
    console.log("Created:", newIssue);
    res.status(201).send(newIssue);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

export default router;