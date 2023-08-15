const inquirer = require("inquirer");
const connection = require("./db/connection");
const {
  viewDepartments,
  viewRoles,
  viewEmployees,
  addDepartment,
  // Import other query functions
} = require("./db/queries");
const consoleTable = require("console.table");

// Function to start the application
async function startApp() {
  const { action } = await inquirer.prompt([
    {
      name: "action",
      type: "list",
      message: "What would you like to do?",
      choices: [
        "View all departments",
        "View all roles",
        "View all employees",
        "Add a department",
        "Add a role",
        "Add ab employee",
        "Update an employee role",
      ],
    },
  ]);

  switch (action) {
    case "View all departments":
      const departments = await viewDepartments();
      console.table(departments);
      break;
    case "View all roles":
      const roles = await viewRoles();
      console.table(roles);
      break;
    case "View all employees":
      const employees = await viewEmployees();
      console.table(employees);
      break;
    case "Add a department":
      const departmentNamePrompt = await inquirer.prompt([
        {
          name: "name",
          type: "input",
          message: "Enter the name of the department:",
        },
      ]);

      const departmentName = departmentNamePrompt.name; // Capture user input
      await addDepartment(departmentName);
      break;
  }

  connection.end();
}

startApp();
