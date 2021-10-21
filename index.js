const inquirer = require("inquirer");
const fs = require("fs");
const generateMarkdown = require("./src/generateMarkdown.js");
const Manager = require("./lib/Manager.js");
const Engineer = require("./lib/Engineer.js");
const Intern = require("./lib/Intern.js");
const { type } = require("os");

const path = "./dist/output.html";

function init() {
    let validate = false;
    let inputMethod = "";
    let employeeArray = [];

    try {
        if (fs.existsSync(path)) {
            console.log("Exisiting file found, do you wish to add an empolyee or create a new document?\n"
                + "Type 'add' to add employee or 'new' to create a 'new' document"
            );
            while (!validate) {
                inquirer
                    .prompt([
                        {
                            name: "userInput",
                            message: "Add/New: "
                        }
                    ])
                    .then(answer => {
                        if (answer.userInput.toLowerCase() === "add" || answer.userInput.toLowerCase() === "new") {
                            validate = true;
                            inputMethod = answer.userInput.toLowerCase();
                            employeeArray.push(createEmployee());
                            while (!add) {
                                inquirer
                                .prompt([
                                    {
                                        name: "keepAdding",
                                        message: "Add another employee? (Y/N)"
                                    }
                                ])
                                .then(addEmployee => {
                                    if (addEmployee.keepAdding.toLowerCase() === "y") {
                                        employeeArray.push(createEmployee());
                                    } else if (addEmployee.keepAdding.toLowerCase() === "n") {
                                        writeToFile(employeeArray, inputMethod);
                                    } else {
                                        console.log("! Error, enter Y  or N !");
                                    }
                                })
                            }
                        } else {
                            console.log("! Error, input must be add or new !");
                        }
                    })
            }

            

        }
    } catch(err) {
        // file does not exists create brand new one
        console.log("Welcome, you will be prompted with a set of questions to generate an employee list document.");
        createEmployee("new");
    }
}


// MIGHT HAVE TO MOVE THIS TO SRC, HELPER CODE

function createEmployee() {
    let validate = false;
    // lets create the inquirer to get the user info
    // this should be looped multiple times for each employee
    inquirer
        .prompt([
            {
                name: "name",
                message: "Enter employee name: "
            },
            {
                name: "id",
                message: "ID: "
            },
            {
                name: "email",
                message: "Email: "
            },
        ])
        .then(answers => {
            while(!validate) {
                inquirer
                    .prompt([
                        {
                            name: "employee",
                            message: "Enter employee type (Manager, Engineer, Intern): "
                        }
                    ])
                .then(answer => {
                    switch(answer.employee.toLowerCase()) {
                        case "manager":
                            inquirer
                                .prompt([
                                    {
                                        name: "officeNumber",
                                        message: "Enter office number: "
                                    }    
                                ])
                                .then(property => {
                                    return new Manager(answers.name, answers.id, answers.email, property.officeNumber);
                                })
                            validate = true;
                            break;
                        case "engineer":
                            inquirer
                                .prompt([
                                    {
                                        name: "github",
                                        message: "Enter github account name: "
                                    }    
                                ])
                                .then(property => {
                                    return new Engineer(answers.name, answers.id, answers.email, property.github);
                                })
                            validate = true;
                            break;
                        case "intern":
                            inquirer
                                .prompt([
                                    {
                                        name: "school",
                                        message: "Enter school name: "
                                    }    
                                ])
                                .then(property => {
                                    return new Intern(answers.name, answers.id, answers.email, property.school);
                                })
                            validate = true;
                            break;
                        default:
                            console.log("! Error, enter appropriate job title !");
                    }
                }) 
            }
        });   
}

// TO EDIT FILE !!!! READ THEN WRITE - So first read the file in the write to it


// pass the array that contains all the data of the employees
// This stays in index.js
function writeToFile(arrayOfEmployees, inputMethod) {
    // generate brand new file
    fs.writeFile("employees.html", createHTML(arrayOfEmployees, inputMethod), err => {
        if (err)
            console.log(err);
        else
            console.log("Success");
    })
}

function createHTML(arrayOfEmployees, inputMethod) {
    if (inputMethod === "add") {
        // get the file and turn it into an array
        // here find the array that contains 
        
        // read file
        fs.readFile(".dist/employeeList.html", "utf8", (err, data) => {
            if (err) {
                console.log(err);
                return;
            }
            console.log(data);
        })


    } else {
        // create brand new HTML
        return `<!DOCTYPE html>
        <html lang="en-US">
            <head>
                <link rel="stylesheet" href="/dist/style.css">
            </head>  
            <body>
                <div id="header">
                    <h1>Employee List</h1>
                </div>
                <div id="employee-container">
                ${convertArrayToString(arrayOfEmployees)}
                </div>
            </body>
        </html>
        `;
    }
}

function convertArrayToString(arrayOfEmployees) {
    let employeeString = "";
    arrayOfEmployees.forEach(element => {
        employeeString += `<div class="class">
            <h3>${element.getName()}<h3>
            <h4>${element.getRole()}>
            <ul>
                <li>ID: ${element.getId()}</li>
                <li>Email: ${element.getEmail()}</li>
                <li>${getExtendedPropery(element)}</li>
        `
    })
    console.log(employeeString);
    return employeeString;
}

function getExtendedPropery(employee) {
    switch (typeof employee) {
        case "Manager":
            return "Office Code: " + employee.getOfficeCode();
        case "Engineer":
            return "Github: https://github.com/" + employee.getGithub();
        case "Intern":
            return "School: " + employee.getSchool();
    }
}