Got it, here's the updated README with your GitHub repository link:

---

## Live Website

You can access the live version of the rule engine here: [Rule Engine Live Demo](http://51.20.2.65:3000/)
# Rule Engine with AST

## Objective
This project implements a 3-tier rule engine application using JavaScript, designed to determine user eligibility based on attributes such as age, department, income, and spending. The rule engine utilizes an Abstract Syntax Tree (AST) to represent conditional rules, enabling dynamic rule creation, combination, and modification.

## Features
- Flexible data structure to represent AST-based rules.
- Database for storing rules and application metadata.
- API endpoints for rule creation, combination, and evaluation.
- Supports dynamic rule modification.
- Sample eligibility rules for testing and evaluation.

## Table of Contents
- [Project Structure](#project-structure)
- [Data Structure](#data-structure)
- [Data Storage](#data-storage)
- [API Design](#api-design)
- [Testing](#testing)
- [Bonus Features](#bonus-features)
- [Installation and Usage](#installation-and-usage)
- [Contributing](#contributing)
- [License](#license)

---

## Project Structure
The project is structured as a simple 3-tier JavaScript application with:
1. **Frontend (UI)** - Basic UI to create and manage rules.
2. **API Layer** - Exposes endpoints for creating, combining, and evaluating rules.
3. **Backend (Database)** - Stores rules and application metadata.

---

## Data Structure
The AST data structure for rule representation is implemented as JavaScript objects, with the following structure:

- **Node Fields**:
  - `type`: Specifies the node type, such as `"operator"` (e.g., AND/OR) or `"operand"` (conditions).
  - `left`: Reference to the left child node.
  - `right`: Reference to the right child node (for operators).
  - `value`: Stores the operand's value (e.g., age, salary).

This design allows flexible modifications by adding or removing sub-expressions or changing conditions.

---

## Data Storage
- **Database Choice**: Can use a NoSQL database like MongoDB for scalability, or a relational database for rule consistency.
- **Schema**:
  - **Rules Collection**: Stores rule definitions.
  - **AST Nodes Collection**: Represents the tree structure with fields for node ID, type, left/right children, and values.

**Sample Schema (MongoDB)**:
```json
{
  "rule_id": "1",
  "rule_string": "((age > 30 AND department = 'Sales') OR (age < 25 AND department = 'Marketing')) AND (salary > 50000 OR experience > 5)"
}
```

**AST Nodes Example**:
```json
{
  "node_id": "1",
  "type": "operator",
  "left": { "node_id": "2" },
  "right": { "node_id": "3" },
  "value": null,
  "rule_id": "1"
}
```

---

## API Design

### 1. `createRule(ruleString)`
- **Description**: Parses a rule string (e.g., `"age > 30 AND department = 'Sales'"`) into an AST represented by JavaScript objects.
- **Returns**: Root Node of the AST.

### 2. `combineRules(rules)`
- **Description**: Accepts an array of rule strings and combines them into a single AST, optimized for efficiency.
- **Returns**: Root node of the combined AST.

### 3. `evaluateRule(astJson, data)`
- **Description**: Evaluates the AST against provided user attribute data, returning `true` if the criteria are met, otherwise `false`.
- **Parameters**:
  - `astJson`: JSON representation of the AST.
  - `data`: Object with user attributes (e.g., `{"age": 35, "department": "Sales", "salary": 60000, "experience": 3}`).

---

## Testing

### Test Cases
1. **Create Individual Rules**: Validate that `createRule` correctly represents sample rules as ASTs.
2. **Combine Rules**: Verify that `combineRules` merges rules correctly and optimizes the AST.
3. **Evaluate Rules**: Test `evaluateRule` against various data inputs to ensure accuracy.
4. **Additional Rule Combinations**: Create and evaluate additional rules and verify expected outcomes.

---

## Bonus Features
- **Error Handling**: Handles invalid rule strings and data formats (e.g., missing operators, invalid comparisons).
- **Attribute Validation**: Ensures attribute names are part of a pre-defined catalog.
- **Rule Modification**: Allows modification of existing rules by changing operators, operand values, or adding/removing sub-expressions.
- **Extended Rule Language**: Supports potential user-defined functions for more advanced conditions.

---

## Installation and Usage

1. **Clone the Repository**
   ```bash
   git clone https://github.com/Sanyashrivastav/Rule_Engine.git
   cd Rule_Engine
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Run the Application**
   ```bash
   # Run the backend server
   node app.js
   ```

4. **API Usage**
   - Example API call for creating a rule:
     ```http
     POST /api/createRule
     Body: { "ruleString": "((age > 30 AND department = 'Sales') OR (age < 25 AND department = 'Marketing')) AND (salary > 50000 OR experience > 5)" }
     ```

---

## Contributing
Contributions are welcome! Please follow these steps:
1. Fork the repository.
2. Create a new branch.
3. Make your changes.
4. Submit a pull request.

---

## License
This project is licensed under the MIT License.

---

Happy rule-building!
⚙️Powering decisions, one rule at a time! 🚀✨
