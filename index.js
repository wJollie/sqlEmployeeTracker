const inquirer = require("inquirer");
const connection = require("./db/connection");
const {
  viewDepartments,
  viewRoles,
  viewEmployees,
  addDepartment,
  addRole,
  addEmployee,
  updateEmployeeRole,
  updateEmployeeManager,
  getEmployeesByManager,
  getEmployeesByDepartment,
  deleteDepartment,
  deleteRole,
  deleteEmployee,
  getDepartmentBudget,
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
        "Update an employee manager",
        "View employees by manager",
        "View employees by department",
        "Delete a department",
        "Delete a role",
        "Delete an employee",
        "View the total utilized budget of a department",
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

    case "Update an employee role":
      const employeeRoleInfo = await inquirer.prompt([
        {
          name: "employee_id",
          type: "input",
          message: "Enter the ID of the employee:",
        },
        {
          name: "role_id",
          type: "input",
          message: "Enter the role ID of the employee:",
        },
      ]);
      await updateEmployeeRole(
        employeeRoleInfo.employee_id,
        employeeRoleInfo.role_id
      );
      break;
    case "Update an employee manager":
      const employeeManagerInfo = await inquirer.prompt([
        {
          name: "employee_id",
          type: "input",
          message: "Enter the ID of the employee:",
        },
        {
          name: "manager_id",
          type: "input",
          message: "Enter the manager ID of the employee:",
        },
      ]);
      await updateEmployeeManager(
        employeeManagerInfo.employee_id,
        employeeManagerInfo.manager_id
      );
      break;
    case "View employees by manager":
      const managerId = await inquirer.prompt([
        {
          name: "manager_id",
          type: "input",
          message: "Enter the ID of the manager:",
        },
      ]);
      const employeesByManager = await getEmployeesByManager(
        managerId.manager_id
      );
      console.table(employeesByManager);
      break;
    case "View employees by department":
      const departmentId = await inquirer.prompt([
        {
          name: "department_id",
          type: "input",
          message: "Enter the ID of the department:",
        },
      ]);
      const employeesByDepartment = await getEmployeesByDepartment(
        departmentId.department_id
      );
      console.table(employeesByDepartment);
      break;
    case "Delete a department":
      const departmentIdToDelete = await inquirer.prompt([
        {
          name: "department_id",
          type: "input",
          message: "Enter the ID of the department:",
        },
      ]);
      await deleteDepartment(departmentIdToDelete.department_id);
      break;
    case "Delete a role":
      const roleIdToDelete = await inquirer.prompt([
        {
          name: "role_id",
          type: "input",
          message: "Enter the ID of the role:",
        },
      ]);
      await deleteRole(roleIdToDelete.role_id);
      break;
    case "Delete an employee":
      const employeeIdToDelete = await inquirer.prompt([
        {
          name: "employee_id",
          type: "input",
          message: "Enter the ID of the employee:",
        },
      ]);
      await deleteEmployee(employeeIdToDelete.employee_id);
      break;
    case "View the total utilized budget of a department":
      const departmentIdToView = await inquirer.prompt([
        {
          name: "department_id",
          type: "input",
          message: "Enter the ID of the department:",
        },
      ]);
      const totalBudget = await getDepartmentBudget(
        departmentIdToView.department_id
      );
      console.table(totalBudget);
      break;
  }

  connection.end();
}

startApp();
