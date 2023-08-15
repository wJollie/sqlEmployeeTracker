// Import the connection from connection.js
const connection = require("./connection");

async function getDepartmentIdByName(name) {
  try {
    const [rows] = await connection.execute(
      "SELECT id FROM department WHERE name = ?",
      [name]
    );
    if (rows.length > 0) {
      return rows[0].id;
    } else {
      return null; // Return null if department not found
    }
  } catch (error) {
    console.error("Error getting department ID by name:", error);
    throw error;
  }
}

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

async function addDepartment(name) {
  try {
    await connection.execute("INSERT INTO department (name) VALUES (?)", [
      name,
    ]);
    console.log(`Department "${name}" added successfully.`);
  } catch (error) {
    console.error("Error adding department:", error);
    throw error;
  }
}

async function addRole(title, salary, departmentId) {
  try {
    await connection.execute(
      "INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)",
      [title, salary, departmentId]
    );
    console.log(`Role "${title}" added successfully.`);
  } catch (error) {
    console.error("Error adding role:", error);
    throw error;
  }
}

module.exports = {
  getDepartmentIdByName,
  viewDepartments,
  viewRoles,
  viewEmployees,
  addDepartment,
  addRole,
  // Other functions...
};
