const inquirer = require("inquirer");
const express = require("express");
const sequelize = require("./config/connection");
const { department, roles, employee } = require("./routes");

const app = express();
const PORT = process.env.PORT || 3001;

// Express middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

sequelize
  .sync()
  .then(() => {
    app.listen(PORT, () => console.log("Now listening"));
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
    process.exit(1); // Exit process if connection fails
  });

const viewAllEmployees = async () => {};

const addEmployee = async () => {};

const updateEmployeeRole = async () => {};

const viewAllRoles = async () => {
  try {
    // Retrieve all roles with associated department information
    const rolesList = await roles.findAll({
      include: {
        model: department,
        attributes: ["name"], // Include department name only
      },
      attributes: ["id", "title", "salary", "department_id"], // Select only existing columns
    });

    // Format and display the roles data in a table
    console.table(
      rolesList.map((role) => ({
        Role_ID: role.id,
        Job_Title: role.title,
        Department: role.department
          ? role.department.name
          : "Unknown Department", // Check if department exists
        Salary: role.salary,
      }))
    );
  } catch (error) {
    console.error("Error retrieving roles:", error);
  }
};

const addRole = async () => {
  try {
    // Retrieve all departments from the database
    const departmentsList = await department.findAll();

    // Map departments to choices for inquirer prompt
    const departmentChoices = departmentsList.map((dept) => ({
      name: dept.name,
      value: dept.id,
    }));

    // Prompt user for role details
    const { roleName, roleSalary, departmentId } = await inquirer.prompt([
      {
        type: "input",
        name: "roleName",
        message: "Enter the name of the role:",
        validate: (input) => (input ? true : "Role name cannot be empty"),
      },
      {
        type: "input",
        name: "roleSalary",
        message: "Enter the salary for the role:",
        validate: (input) => {
          const salary = parseFloat(input);
          return isNaN(salary) || salary <= 0
            ? "Salary must be a positive number"
            : true;
        },
      },
      {
        type: "list",
        name: "departmentId",
        message: "Select the department for this role:",
        choices: departmentChoices,
      },
    ]);

    // Create a new role in the database
    await roles.create({
      title: roleName,
      salary: parseFloat(roleSalary),
      department_id: departmentId,
    });

    console.log(`Role '${roleName}' added successfully.`);
  } catch (error) {
    console.error("Error adding role:", error);
  }
};

const viewAllDepartments = async () => {
  try {
    // Retrieve all departments from the database
    const departmentsList = await department.findAll();

    // Format and display the department data in a table
    console.table(
      departmentsList.map((dept) => ({
        id: dept.id,
        name: dept.name, // Ensure this matches the column name
      }))
    );
  } catch (error) {
    console.error("Error retrieving departments:", error);
  }
};

const addDepartment = async () => {
  try {
    // Prompt user for the department name
    const { departmentName } = await inquirer.prompt({
      type: "input",
      name: "departmentName",
      message: "Enter the name of the department:",
      validate: (input) => (input ? true : "Department name cannot be empty"),
    });

    // Create a new department in the database
    await department.create({
      name: departmentName,
    });

    console.log(`Department '${departmentName}' added successfully.`);
  } catch (error) {
    console.error("Error adding department:", error);
  }
};

const userQuit = () => {
  console.log("Exiting application.");
  process.exit(0);
};

const handleUserAction = async (action) => {
  try {
    switch (action) {
      case "View All Employees":
        await viewAllEmployees();
        break;
      case "Add an Employee":
        await addEmployee();
        break;
      case "Update Employee Role":
        await updateEmployeeRole();
        break;
      case "View All Roles":
        await viewAllRoles();
        break;
      case "Add a Role":
        await addRole();
        break;
      case "View All Departments":
        await viewAllDepartments();
        break;
      case "Add a Department":
        await addDepartment();
        break;
      case "Quit":
        userQuit();
        break;
    }
  } catch (error) {
    console.error("Error handling user action:", error);
  }
};

const promptUser = async () => {
  let action = null;

  while (action !== "Quit") {
    try {
      const { selectedAction } = await inquirer.prompt({
        type: "list",
        name: "selectedAction",
        message: "What would you like to do?",
        choices: [
          "View All Employees",
          "Add an Employee",
          "Update Employee Role",
          "View All Roles",
          "Add a Role",
          "View All Departments",
          "Add a Department",
          "Quit",
        ],
      });

      action = selectedAction;

      if (action !== "Quit") {
        await handleUserAction(action);
      }
    } catch (error) {
      console.error("Error during user prompt:", error);
    }
  }
};

promptUser();
