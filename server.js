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
        'Add a new department.',
        'Add a new role.',
        'Add a new employee.',
        'Update employee roles.',
        'Update employee managers.',
        'View employees by manager.',
        'Delete department.',
        'Delete role.',
        'Delete employees',
        'View budget for department',
        'Exit',
        ''
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

        case 'Add a new department.':
          addDepartment();
          break;

        case 'Add a new role.':
          addRole();
          break;

        case 'Add a new employee.':
          addEmployee();
          break;

        case 'Update employee roles.':
          updateEmployeeRole();
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

// async function to view all departments
async function viewAllDepartments() {
  //departments variable which set to view all departments function from index.js in db folder
  const departments = await db.viewAllDepartments();
  // console tables departments variable
  console.table(departments);
  // runs main menu prompt 
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
}

async function addEmployee() {
  const roles = await db.viewAllEmployees();
  const roleChoices = roles.map(({ role_id }) => ({
    name: role_id,
    value: role_id
  }))

  const employees = await db.viewAllEmployees();
  const managerIdChoices = employees.map(({ manager_id, title }) => ({
    name: title,
    value: manager_id
  }))

  const employee = await inquirer.prompt([
    {
      type: 'input',
      name: 'first_name',
      message: "What is the new employees' first name?"
    },
    {
      type: 'input',
      name: 'last_name',
      message: "What is the new employees' last name?"
    },
    {
      type: 'list',
      name: 'role_id',
      message: "What is the new employees' role ID?",
      choices: roleChoices
    },
    {
      type: 'list',
      name: 'manager_id',
      message: 'What is the manager ID?',
      choices: managerIdChoices
    }
  ])
  await db.addEmployee(employee);
  viewAllEmployees();
}

async function updateEmployeeRole() {
  const roles = await db.viewAllRoles();
  const roleChoices = roles.map(({ title, id }) => ({
    name: title,
    value: id
  }))
  const employees = await db.viewAllEmployees();
  const employeeChoices = employees.map(({ id, first_name, last_name}) => ({
    name: `${first_name} ${last_name}`,
    value: id
  
  })); 

  const employeeRole = await inquirer.prompt([
    {
      type: 'list',
      name: 'id',
      message: "Whose role would you like to update?",
      choices: employeeChoices
    },

    {
      type: 'list',
      name: 'role_id',
      message: 'What is the employees new role ID?',
      choices: roleChoices
    }
    
  ])
  console.log(employeeRole);
  await db.updateEmployeeRole(employeeRole);
  viewAllEmployees();

}

mainMenu();

// connection.query("SELECT * from role", function (error, res) {
//   showroles = res.map(role => ({ name: role.title, value: role.id }))
// })

// connection.query("SELECT * from employee", function (error, res) {
//   // console.log(error, res);
// //   showemployees = res.map(emp => ({ name: `${emp.first_name} ${emp.last_name}`, value: emp.id }))
// })
// add update employee roles function

// Bonus
// add UPDATE employee managers function
// add function to view employees by manager
// add DELETE functions for all sections
// view combined salaries of all employees in a single department



