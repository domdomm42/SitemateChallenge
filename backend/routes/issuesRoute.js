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

// Get a single issue by id
router.get("/:id", async (req, res) => {
  try {
    const issue = await Issue.findOne({ id: req.params.id });
    if (!issue) {
      return res.status(404).send({ error: "Issue not found" });
    }
    res.send(issue);
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

// Update issue
router.put("/:id", async (req, res) => {
  try {
    const updatedIssue = await Issue.findOneAndUpdate(
      { id: req.params.id },
      req.body,
      { new: true }
    );
    if (!updatedIssue) {
      return res.status(404).send({ error: "Issue not found" });
    }
    console.log("Updated:", updatedIssue);
    res.send(updatedIssue);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

export default router;
