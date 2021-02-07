require('console.table');
const inquirer = require("inquirer");
const db = require("./db");

async function viewAllDepartments() {
  const departments = await db.viewAllDepartments();
  console.table(departments);
  mainMenu();
}

async function viewAllRoles() {
  const roles = await db.viewAllRoles();
  console.table(roles);
  mainMenu();
}

async function viewAllEmployees() {
  const employees = await db.viewAllEmployees();
  console.table(employees);
  mainMenu();
}

async function addRole() {
  const departments = await db.viewAllDepartments();
  const departmentChoices = departments.map(({ id, name }) => ({
    name: name,
    value: id
  }))

  const role = await inquirer.prompt([
    {
      type: 'input',
      name: 'title',
      message: 'What new title what you like to add?'
    },
    {
      type: 'input',
      name: 'salary',
      message: 'What is the salary?'
    },
    {
      type: 'list',
      name: 'department_id',
      message: 'What is the department ID?',
      choices: departmentChoices
    }
  ])
await db.addRole(role);
viewAllRoles();
// mainMenu();
}


viewAllEmployees();



