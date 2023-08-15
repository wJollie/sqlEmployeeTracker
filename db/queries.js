// Import the connection from connection.js
const connection = require("./connection");

// Function to retrieve all departments
async function viewDepartments() {
  try {
    const [rows] = await connection.execute("SELECT * FROM department");
    return rows;
  } catch (error) {
    console.error("Error fetching departments:", error);
    throw error;
  }
}

async function viewRoles() {
  try {
    const [rows] = await connection.execute("SELECT * FROM role");
    return rows;
  } catch (error) {
    console.error("Error fetching roles:", error);
    throw error;
  }
}

async function viewEmployees() {
  try {
    const [rows] = await connection.execute(`
        SELECT
        employee.id,
        employee.first_name,
        employee.last_name,
        role.title,
        department.name AS department,
        role.salary,
        CONCAT(manager.first_name, ' ', manager.last_name) AS manager
        FROM employee
        INNER JOIN role ON employee.role_id = role.id
        INNER JOIN department ON role.department_id = department.id
        LEFT JOIN employee manager ON manager.id = employee.manager_id; `);
    return rows;
  } catch (error) {
    console.error("error fetching employees:", error);
    throw error;
  }
}

module.exports = {
  viewDepartments,
  viewRoles,
  viewEmployees,
  // Other functions...
};
