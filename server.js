const cTable = require('console.table');
const mysql = require("mysql");
const inquirer = require("inquirer");

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: "root",
    password: "Anime100587",
    database: "employee_trackerDB"
});

connection.connect((err, res) => {
    if (err) throw err;
    makeAction();
});

const makeAction = () => {
    inquirer.prompt({
        name: 'action',
        type: 'list',
        message: 'What would you like to do?',
        choices: [
           
        ]
    }).then((answer) => {
        switch (answer.action) {
            case :
                break;

            case :
                break;

            case :
                
                break;

            case :
               
                break;

            case :
                
                break;

            case 'Finished':
                connection.end();
                break;

            default:
                console.log(`Invalid action: ${answer.action}`);
                break;
        }
    });
};