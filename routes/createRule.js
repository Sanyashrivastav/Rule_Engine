const express = require("express");
const Rule = require("../models/Rule")
const router = express.Router();
const { parseRuleString, combineNodes, evaluate,printTree} = require('../utils/ast');

router.post("/", async (req, res) => {
  console.log(req.body);
  try {
    const { ruleName, ruleString } = req.body;
    if (!ruleName || !ruleString) {
      return res.status(400).json({ error: 'ruleName and ruleString are required' });
    }
    const rootNode = parseRuleString(ruleString);
    const rule = new Rule({ ruleName, ruleAST: rootNode });
    await rule.save();
    printTree(rootNode);
    res.status(201).json(rule);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;