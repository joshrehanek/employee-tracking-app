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
        'exit',
      ],
    })
    .then((answer) => {
      switch (answer.action) {
        case 'View all departments.':
          artistSearch();
          break;

        case 'View all roles.':
          multiSearch();
          break;

        case 'View all employees.':
          rangeSearch();
          break;

        case 'Add a department.':
          songSearch();
          break;

        case 'Add a role.':
          songSearch();
          break;

        case 'Add an employee.':
          songSearch();
          break;

        case 'Update employee roles.':
          songSearch();
          break;

        case 'Update employee managers.':
          songSearch();
          break;

        case 'Update employee managers.':
          songSearch();
          break;

        case 'Update employee managers.':
          songSearch();
          break;

        case 'Exit':
          connection.end();
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



