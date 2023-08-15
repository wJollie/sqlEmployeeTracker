const inquirer = require("inquirer");
const connection = require("./db/connection");
const {
  viewDepartments,
  viewRoles,
  viewEmployees,
  addDepartment,
  addRole,
  addEmployee,
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
        "Add an employee",
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
    case "Add a role":
      const roleInfo = await inquirer.prompt([
        {
          name: "title",
          type: "input",
          message: "Enter the title of the role:",
        },
        {
          name: "salary",
          type: "input",
          message: "Enter the salary of the role:",
        },
        {
          name: "department_id",
          type: "input",
          message: "Enter the department ID of the role:",
        },
      ]);
      await addRole(roleInfo.title, roleInfo.salary, roleInfo.department_id);
      break;
    case "Add an employee":
      const employeeInfo = await inquirer.prompt([
        {
          name: "first_name",
          type: "input",
          message: "Enter the first name of the employee:",
        },
        {
          name: "last_name",
          type: "input",
          message: "Enter the last name of the employee:",
        },
        {
          name: "role_id",
          type: "input",
          message: "Enter the role ID of the employee:",
        },
        {
          name: "manager_id",
          type: "input",
          message: "Enter the manager ID of the employee:",
        },
      ]);
      await addEmployee(
        employeeInfo.first_name,
        employeeInfo.last_name,
        employeeInfo.role_id,
        employeeInfo.manager_id
      );
      break;
  }

  connection.end();
}

startApp();
