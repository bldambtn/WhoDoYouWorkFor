const inquirer = require("inquirer");
const express = require("express");
const sequelize = require("./config/connection");

// const app = express();
// const PORT = process.env.PORT || 3001;

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// sequelize.sync().then(() => {
//   app.listen(PORT, () => console.log("Now listening"));
// });

// Function to prompt the user for input
const promptUser = async () => {
    const { action } = await inquirer.prompt({
        type: "list",
        name: "action",
        message: "What would you like to do?",
        choices: ["Add Department", "Add Role"],
    });

    if (action === "Add Department") {
        const { departmentName } = await inquirer.prompt({
            type: "input",
            name: "departmentName",
            message: "What is the name of the department?",
        });
        console.log(`Department Name: ${departmentName}`);
    } else if (action === "Add Role") {
        const { roleName, salary, department } = await inquirer.prompt([
            {
                type: "input",
                name: "roleName",
                message: "What is the name of the role?",
            },
            {
                type: "input",
                name: "salary",
                message: "What is the salary of the role?",
            },
            {
                type: "list",
                name: "department",
                message: "Which department does the role belong to?",
                choices: ["Department 1", "Department 2", "Department 3"], // Add options based on departments added
            }
        ]);
        console.log(`Role Name: ${roleName}`);
        console.log(`Salary: ${salary}`);
        console.log(`Department: ${department}`);
    }
};

promptUser();