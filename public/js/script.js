const tabs = document.querySelectorAll(".tab");
const forms = document.querySelectorAll(".form-container");

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    tabs.forEach((t) => t.classList.remove("active"));
    forms.forEach((f) => f.classList.remove("active"));

    tab.classList.add("active");
    const formId = tab.getAttribute("data-tab");
    document.getElementById(formId).classList.add("active");
  });
});

function generateTreeHTML(node, prefix = "", isLeft = true) {
  if (!node) return "";

  let treeHTML = "";
  treeHTML +=
    prefix +
    (isLeft ? "├── " : "└── ") +
    (node.type === "operator"
      ? node.operator
      : `${node.key} ${node.operator} ${node.value}`) +
    "<br>";

  if (node.left)
    treeHTML += generateTreeHTML(
      node.left,
      prefix + (isLeft ? "│   " : "    "),
      true
    );
  if (node.right)
    treeHTML += generateTreeHTML(
      node.right,
      prefix + (isLeft ? "│   " : "    "),
      false
    );

  return treeHTML;
}

function displayTree(tree) {
  const treeHTML = generateTreeHTML(tree);
  document.getElementById("combined-rules-tree").innerHTML = treeHTML;
}

document
  .getElementById("create-rule-form")
  .addEventListener("submit", async function (event) {
    event.preventDefault();
    const ruleName = document.getElementById("ruleName").value;
    const ruleString = document.getElementById("ruleString").value;
    const response = await fetch("/create_rule", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ruleName, ruleString }),
    });
    const result = await response.json();
    let treeHTML = generateTreeHTML(result.ruleAST);
    treeHTML += `<br><p>Rule Name: ${result.ruleName}</p>`;
    document.getElementById("create-rule-result").innerHTML = treeHTML;
  });

// combine
document
  .getElementById("combine-rules-form")
  .addEventListener("submit", async function (event) {
    event.preventDefault();
    const op = document.getElementById("operator1").value;
    const rules = Array.from(
      document.querySelectorAll('input[id^="combine-rule"]')
    ).map((input) => input.value);
    console.log(op);
    console.log(rules);
    
    
    const response = await fetch("/combine_rules", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ rules, op }),
    });
    const result = await response.json();
    console.log(result);
    
    let treeHTML = generateTreeHTML(result.ruleAST);
    treeHTML += `<br><p>Rule Name: ${result.ruleName}</p>`;
    document.getElementById("combine-rules-result").innerHTML = treeHTML;
  });

// evaluate
document
  .getElementById("evaluate-rule-form")
  .addEventListener("submit", async function (event) {
    event.preventDefault();
    const ast = document.getElementById("evaluate-ast").value;
    const data = document.getElementById("evaluate-data").value;
    const response = await fetch("/evaluate_rule", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ast, data: JSON.parse(data) }),
    });
    const result = await response.json();
    document.getElementById("evaluate-rule-result").textContent =
      JSON.stringify(result, null, 2);
  });
