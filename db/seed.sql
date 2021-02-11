use employee_trackerDB; 

INSERT INTO department
    (name)
VALUES 
    ('Manager'),
    ('Engineer'),
    ('Sales');

INSERT INTO role
    (title, salary, department_id)
VALUES
    ('Manager', 750000, 1),
    ('Manager', 500000, 1),
    ('Manager', 50000, 1),
    ('Engineer', 1000000, 2),
    ('Engineer', 1000000, 2),
    ('Sales', 250000, 3),
    ('Sales', 250000, 3),

INSERT INTO employee
    (first_name, last_name, role_id, manager_id)
VALUES  
    ('Micheal', 'Scott', 1, NULL),
    ('Ryan', 'Howard', 2, 1),
    ('Rigby', 'Raccoon', 3, 1),
    ('Benson', 'Hedges', 1, NULL),
    ('Skips', 'Wellington', 5, 4),
    ('Mika', 'Bella', 1, NULL),
    ('Josh', 'Rehanek', 8, 7),
 




