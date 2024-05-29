const { Pool } = require("pg");

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'employees',
  password: 'hrhk',
  port: 5432 // default PostgresSQL port
});

//pool.connect();
pool.connect((err, client, done) => {
  if (err) throw err;
  console.log(`Connected to database.`)
})

async function findAllDepartments() {
  try {
    // Execute the query to select all departments
    const { rows } = await pool.query('SELECT id, name FROM department;');

    // Return the rows from the result set
    return rows;
  } catch (error) {
    // Handle any errors
    throw error;
  }
}

async function findAllRoles() {
  try {
    // Execute the query to select all departments
    const { rows } = await pool.query('SELECT role.id, title, salary, department.name AS department FROM role left join department on department.id = role.department_id;');

    // Return the rows from the result set
    return rows;
  } catch (error) {
    // Handle any errors
    throw error;
  }
}

async function findAllEmployees() {
  try {
    // Execute the query to select all departments
    const { rows } = await pool.query("SELECT e.id AS employee_id, e.first_name, e.last_name, r.title, d.name AS department, r.salary,  CONCAT(m.first_name, ' ', m.last_name) AS manager FROM employee e JOIN role r ON e.role_id = r.id JOIN   department d ON r.department_id = d.id LEFT JOIN employee m ON e.manager_id = m.id;");

    // Return the rows from the result set
    return rows;
  } catch (error) {
    // Handle any errors
    throw error;
  }

}

async function createDepartment(department) {
  try {
    const row = await pool.query("INSERT INTO department (name) VALUES ($1)", [department]);
    return row.rows;

  } catch (error) {
    throw error;
  }
}

async function createRole(role) {
  try {
    const row = await pool.query("INSERT INTO role (title, salary, department_id) VALUES ($1, $2, $3)", [role.title, role.salary, role.department_id]);
    return row.rows;

  } catch (error) {
    throw error;
  }
}

async function createEmployee(empl) {
  try {
    const row = await pool.query("INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)", [empl.firstName, empl.lastName, empl.roleId, empl.managerId]);

    return row.rows;
  } catch (error) {
    // Handle any errors
    throw error;
  }
}

async function updateEmployeeRole(employeeId, roleId) {
  try {
    const row = await pool.query("UPDATE employee SET role_id = $1 WHERE id = $2", [roleId, employeeId]);

    return row.rows;
  } catch (error) {
    // Handle any errors
    throw error;
  }
}

module.exports = {
  findAllDepartments,
  findAllRoles,
  findAllEmployees,
  createDepartment,
  createRole,
  createEmployee,
  updateEmployeeRole,
};