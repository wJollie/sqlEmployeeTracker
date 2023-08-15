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

async function addEmployee(firstName, lastName, roleId, managerId) {
  try {
    await connection.execute(
      "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)",
      [firstName, lastName, roleId, managerId]
    );
    console.log(`Employee "${firstName} ${lastName}" added successfully.`);
  } catch (error) {
    console.error("Error adding employee:", error);
    throw error;
  }
}

async function updateEmployeeRole(employeeId, newRoleId) {
  try {
    await connection.execute("UPDATE employee SET role_id = ? WHERE id = ?", [
      newRoleId,
      employeeId,
    ]);
    console.log(`Employee role updated successfully.`);
  } catch (error) {
    console.error("Error updating employee role");
    throw error;
  }
}

async function updateEmployeeManager(employeeId, newManagerId) {
  try {
    await connection.execute(
      "UPDATE employee SET manager_id = ? WHERE id = ?",
      [newManagerId, employeeId]
    );
    console.log(`Employee manager updated successfully.`);
  } catch (error) {
    console.error("Error updating employee manager");
    throw error;
  }
}

async function getEmployeesByManager(managerId) {
  try {
    const [rows] = await connection.execute(
      `SELECT * FROM employee WHERE manager_id = ?`,
      [managerId]
    );
    return rows;
  } catch (error) {
    console.error("Error fetching employees by manager:", error);
    throw error;
  }
}

async function getEmployeesByDepartment(departmentId) {
  try {
    const [rows] = await connection.execute(
      "SELECT * FROM employee WHERE role_id IN (SELECT id FROM role WHERE department_id = ?)",
      [departmentId]
    );
    return rows;
  } catch (error) {
    console.error("Error retrieving employees by department:", error);
    throw error;
  }
}

async function deleteDepartment(departmentId) {
  try {
    await connection.execute("DELETE FROM department WHERE id = ?", [
      departmentId,
    ]);
    console.log(`Department deleted successfully.`);
  } catch (error) {
    console.error("Error deleting department:", error);
    throw error;
  }
}

async function deleteRole(roleId) {
  try {
    await connection.execute("DELETE FROM role WHERE id = ?", [roleId]);
    console.log(`Role deleted successfully.`);
  } catch (error) {
    console.error("Error deleting role:", error);
    throw error;
  }
}

async function deleteEmployee(employeeId) {
  try {
    await connection.execute("DELETE FROM employee WHERE id = ?", [employeeId]);
    console.log(`Employee deleted successfully.`);
  } catch (error) {
    console.error("Error deleting employee:", error);
    throw error;
  }
}

async function getDepartmentBudget(departmentId) {
  try {
    const [rows] = await connection.execute(
      "SELECT SUM(salary) AS total_budget FROM role WHERE department_id = ?",
      [departmentId]
    );
    return rows[0].total_budget;
  } catch (error) {
    console.error("Error calculating department budget:", error);
    throw error;
  }
}

module.exports = {
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
};
