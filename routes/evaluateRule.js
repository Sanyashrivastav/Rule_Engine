const express = require("express");
const router = express.Router();
const { parseRuleString, combineNodes, evaluate,printTree } = require('../utils/ast');
const Rule = require("../models/Rule")

router.post("/", async (req, res) => {
    try {
        const { ast, data } = req.body;
        const rule = await Rule.find({ruleName: ast});
        if (!rule) {
          return res.status(404).json({ error: 'Rule not found' });
        }
        const result = evaluate(rule[0].ruleAST, data);
        res.status(200).json({ result });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
 
});

module.exports = router;
