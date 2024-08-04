DROP DATABASE IF EXISTS employee_db;

-- Create a new database
CREATE DATABASE employee_db;

-- Connect to the newly created database
\c employee_db;

DROP TABLE IF EXISTS department;
DROP TABLE IF EXISTS role;
DROP TABLE IF EXISTS employee;

-- Create a department table
CREATE TABLE department (
    id SERIAL PRIMARY KEY,
    department_name VARCHAR(30) UNIQUE NOT NULL
);

-- Create a role table
CREATE TABLE role (
    id SERIAL PRIMARY KEY,
    title VARCHAR(30) UNIQUE NOT NULL,
    salary DECIMAL NOT NULL,
    FOREIGN KEY (department_id) REFERENCES department(id) INTEGER NOT NULL
);

-- Create an employee table
CREATE TABLE employee (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    FOREIGN KEY (role_id) REFERENCES role(id) INTEGER NOT NULL,
    --manager_id: integer (hold reference to another employee that is the manager of current employee, null if employee has no manager)
    --PRIMARY KEY (manager_id) REFERENCES employee(id) INTEGER NOT NULL
);