require('console.table');
const inquirer = require("inquirer");
const db = require("./db");

const mainMenu = () => {
  inquirer
    .prompt({
      name: 'action',
      type: 'list',
      message: 'What would you like to do?',
      choices: [
        'View all departments.',
        'View all roles.',
        'View all employees.',
        'Add a department.',
        'Add a role.',
        'Add a employee.',
        'Update employee roles.',
        'Update employee managers.',
        'View employees by manager.',
        'Delete department.',
        'Delete role.',
        'Delete employees',
        'View budget for department',
        'Exit',
      ],
    })
    .then((answer) => {
      switch (answer.action) {
        case 'View all departments.':
          viewAllDepartments();
          break;

        case 'View all roles.':
          viewAllRoles();
          break;

        case 'View all employees.':
          viewAllEmployees();
          break;

        case 'Add a department.':
          addDepartment();
          break;

        case 'Add a role.':
          addRole();
          break;

        case 'Add an employee.':
          addEmployee();
          break;

        case 'Update employee roles.':
          updateEmployee();
          break;

        case 'Update employee managers.':
          updateEmployeeManager();
          break;

        case 'View employees by manager.':
          viewEmployeesByManager();
          break;

        case 'Delete department.':
          deleteDepartment();
          break;

        case 'Delete role.':
          deleteRole();
          break;

        case 'Delete employee.':
          deleteEmployee();
          break;

        case 'View budget for department.':
          viewBudget();
          break;

        case 'Exit':
          db.connection.end();
          break;

        default:
          console.log(`Invalid action: ${answer.action}`);
          break;
      }
    });
};


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

async function addDepartment() {
  // const departments = await db.viewAllDepartments();
  // const departmentChoices = departments.map(({ id, name }) => ({
  //   name: name,
  //   value: id
  // }))

  const department = await inquirer.prompt([
    {
      type: 'input',
      name: 'id',
      message: 'What is the new department ID?'
    },
    {
      type: 'input',
      name: 'name',
      message: 'What is the new department name?'
    },
    
  ])
  await db.addDepartment(department);
  viewAllDepartments();
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
  mainMenu();
}


mainMenu();

// add switch statement to handle conditions
// add update employee roles function
// add ADD departments function
// add ADD employee function

// Bonus
// add UPDATE employee managers function
// add function to view employees by manager
// add DELETE functions for all sections
// view combined salaries of all employees in a single department



