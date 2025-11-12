const express = require("express");
const Rule = require("../models/Rule")
const router = express.Router();
const { parseRuleString, combineNodes, evaluate,printTree, generateRandomLetterString} = require('../utils/ast');

router.post("/", async (req, res) => {
    console.log(req.body);
    
    try {
        const { rules ,op} = req.body;
        const ruleDocs = await Rule.find({ ruleName: { $in: rules } });
        if (ruleDocs.length === 0) {
          return res.status(404).json({ error: 'No matching rules found' });
        }
        const ruleASTs = ruleDocs.map(rule => rule.ruleAST);
        const combinedRootNode = combineNodes(ruleASTs,op);
        const randomString = generateRandomLetterString(6);
        const rule = new Rule({ ruleName: `combined${randomString}`, ruleAST: combinedRootNode});
        await rule.save();
        printTree(combinedRootNode);
        res.status(201).json(rule);
      } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: error.message });
      }
 
});

module.exports = router;
