// import module & dependencies
require('console.table');
const inquirer = require("inquirer");
const db = require("./db");

//mainMenu inquirer prompt
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
        // 'Update employee managers.',
        // 'View employees by manager.',
        'Delete department.',
        'Delete role.',
        // 'Delete employees',
        // 'View budget for department',
        'Exit',
        ''
      ],
    })
    // case handling 
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

        // case 'Update employee managers.':
        //   updateEmployeeManager();
        //   break;

        // case 'View employees by manager.':
        //   viewEmployeesByManager();
        //   break;

        case 'Delete department.':
          deleteDepartment();
          break;

        case 'Delete role.':
          deleteRole();
          break;

        // case 'Delete employee.':
        //   deleteEmployee();
        //   break;

        // case 'View budget for department.':
        //   viewBudget();
        //   break;

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
  //departments variable which set to view all departments query function from index.js in db folder
  const departments = await db.viewAllDepartments();
  // console tables departments variable
  console.table(departments);
  // runs main menu prompt 
  mainMenu();
}
// async function to view all roles
async function viewAllRoles() {
  // roles variable set to viewAllRoles query function from index.js in db folder
  const roles = await db.viewAllRoles();
  // console tables roles
  console.table(roles);
  // runs main menu prompt
  mainMenu();
}
// async function to viewAllEmployees 
async function viewAllEmployees() {
  //employees variable set to view all query function from index.js in db folder
  const employees = await db.viewAllEmployees();
  // console tables employees
  console.table(employees);
    // runs main menu prompt
  mainMenu();
}

// async function to add department
async function addDepartment() {
// department = prompt answers
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
  //passes department var into/runs addDepartment query function from index.js
 await db.addDepartment(department);
 //runs view all departments function
  viewAllDepartments();
}

//async function to add roles
async function addRole() {
  //departments = results from viewAllDepartments() in index.js
  const departments = await db.viewAllDepartments();
  // maps over departments variable and pulls id & name to use in inquirer prompt
  const departmentChoices = departments.map(({ id, name }) => ({
    name: name,
    value: id
  }))
  // role variable = inquirer prompt answers
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
  // passes role variable into/runs addRole query
  await db.addRole(role);
  //call viewAllRoles 
  viewAllRoles();
}

//async function to add employee
async function addEmployee() {
  //roles = results from viewAllEmployees() query
  const roles = await db.viewAllEmployees();
  // maps over roles variable and pulls role_id to use in inquirer prompt
  const roleChoices = roles.map(({ role_id }) => ({
    name: role_id,
    value: role_id
  }))
 //employees = results from viewAllEmployees() query
  const employees = await db.viewAllEmployees();
   // maps over employees variable and pulls manager_id & title to use in inquirer prompt
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
  // passes employee variable into/runs addEmployee query
  await db.addEmployee(employee);
  // calls viewAllEmployees();
  viewAllEmployees();
}

//async function to update employee roles
async function updateEmployeeRole() {
 //roles = results from viewAllEmployees() query
  const roles = await db.viewAllEmployees();
  // maps over roles variable and pulls role_id & title to use in inquirer prompt
  const roleChoices = roles.map(({ title, role_id }) => ({
    name: title,
    value: role_id
  }))
  const employees = await db.viewAllEmployees();
  const employeeChoices = employees.map(({ id, first_name, last_name}) => ({
    name: `${first_name} ${last_name}`,
    value: id
  
  })); 

  const employeeRole = await inquirer.prompt([
    {
      type: 'list',
      name: 'empId',
      message: "Whose role would you like to update?",
      choices: employeeChoices
    },

    {
      type: 'list',
      name: 'newRole',
      message: 'What is the employees new role ID?',
      choices: roleChoices
    }
    
  ])
  // passes employeRole variable into/runs updateEmployeeRole query
  await db.updateEmployeeRole(employeeRole);
  //calls viewAllEmployees()
  viewAllEmployees();

}
//deltes departments
async function deleteDepartment() {

  const deleteDepartment = await inquirer.prompt([
    {
      type: 'input',
      name: 'name',
      message: 'What department would you like to delete?'
    },
 
  ])
 await db.deleteDepartment(deleteDepartment);
  viewAllDepartments();
}

//deletes roles
async function deleteRole() {

  const deleteRole = await inquirer.prompt([
    {
      type: 'input',
      name: 'title',
      message: 'What role would you like to delete?'
    }
  ])
  await db.deleteRole(deleteRole);
  viewAllRoles();
}

mainMenu();