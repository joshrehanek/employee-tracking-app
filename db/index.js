//import module
const connection = require('./connection');

//sets up DB class
class DB {
    //sets up connection constructor for easy query referencing 
    constructor(connection) {
        this.connection = connection;
    }

    // Queries

    viewAllDepartments() {
        return this.connection.query(
            ` 
            SELECT 
            department.id,
            department.name AS department
            
            FROM 
            department

            ORDER BY
            department.id
            `
        );
    }
    viewAllRoles() {
        return this.connection.query(
            `
            SELECT 
            role.id,
            role.title,
            role.salary,
            department.name AS department
            
            FROM 
            role

            LEFT JOIN
            department ON 
            role.department_id = department.id 

            ORDER BY
            role.id

            `
        )
    }
    viewAllEmployees() {
        return this.connection.query(
            ` SELECT 
            employee.id,
            employee.first_name,
            employee.last_name,
            employee.role_id,
            employee.manager_id
            
            FROM 
            employee

            LEFT JOIN
            role ON 
            employee.role_id = role.id 
 

            ORDER BY
            role.id
            
            `
        )
    }
    addDepartment(department) {
        return this.connection.query(
            `
        INSERT INTO
            department
        SET
            ?
        `, department
        );
    }
    addRole(role) {
        return this.connection.query(
            `
            INSERT INTO
                role  
            SET
                ?
            `, role
        );
    }
    addEmployee(employee) {
        return this.connection.query(
            `
            INSERT INTO
                employee  
            SET
                ?
            `, employee
        );
    }
    updateEmployeeRole(employeeRole) {
        return this.connection.query(
            `
        UPDATE 
            employee
            
        SET
            role_id = ${employeeRole.newRole}
            
        WHERE

            id = ${employeeRole.empId}

        `, employeeRole
        );
    }
    deleteDepartment(deleteDepartment) {
        return this.connection.query(
            `
        DELETE FROM
            department
        WHERE
            ?
        `, deleteDepartment
        );
    }
    deleteRole(deleteRole) {
        return this.connection.query(
            `
        DELETE FROM
            role
        WHERE
            ?
        `, deleteRole
        );
    }
}

module.exports = new DB(connection);

