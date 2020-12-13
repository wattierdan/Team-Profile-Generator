const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const employees = []

function createTeam() {
    inquirer
        .prompt([

            {
                type: "list",
                name: "role",
                message: "what is your role?",
                choices: [
                    "Manager",
                    "Engineer",
                    "Intern",
                    "No more employees(create team page)"
                ]
            }
        ]).then(userChoice => {
            switch (userChoice.role) {
                
                case "Manager":
                    addManager();
                    break;

                case "Engineer":
                    addEngineer();
                    break;

                case "Intern":
                    addIntern();
                    break;

                case "No more employees(create team page)":
                    console.log('creating your team profile now...')
                    render(employees)
                    createHtmlPage()
                    break

            }
        })

    function addManager() {
        inquirer
            .prompt([

                {
                    type: "input",
                    message: "What is your name?",
                    name: "managerName"
                },
                {
                    type: "input",
                    message: "What is your employee ID?",
                    name: "managerID"
                },
                {
                    type: "input",
                    message: "What is your email?",
                    name: "managerEmail"
                },
                {
                    type: "input",
                    message: "What is your office number?",
                    name: "managerOfficeNumber"
                }
            ]).then(userChoice => {
                const manager = new Manager(userChoice.managerName, userChoice.managerID, userChoice.managerEmail, userChoice.managerOfficeNumber)
                employees.push(manager)
                createTeam();

            })


    }

    function addEngineer() {
        inquirer
            .prompt([

                {
                    type: "input",
                    message: "What is your name?",
                    name: "engineerName"
                },
                {
                    type: "input",
                    message: "What is your employee ID?",
                    name: "engineerID"
                },
                {
                    type: "input",
                    message: "What is your email?",
                    name: "engineerEmail"
                },
                {
                    type: "input",
                    message: "What is your GitHub username?",
                    name: "gitHubUsername"
                }
            ]).then(userChoice => {
                const engineer = new Engineer(userChoice.engineerName, userChoice.engineerID, userChoice.engineerEmail, userChoice.gitHubUsername)
                employees.push(engineer)
                createTeam();
            })
    }

    function addIntern() {
        inquirer
            .prompt([

                {
                    type: "input",
                    message: "What is your name?",
                    name: "internName"
                },
                {
                    type: "input",
                    message: "What is your employee ID?",
                    name: "internID"
                },
                {
                    type: "input",
                    message: "What is your email?",
                    name: "internEmail"
                },
                {
                    type: "input",
                    message: "What is your school?",
                    name: "internSchool"
                }
            ]).then(userChoice => {
                const intern = new Intern(userChoice.internName, userChoice.internID, userChoice.internEmail, userChoice.internSchool)
                employees.push(intern)
                createTeam();
            })
    }
}

function createHtmlPage() {
    fs.writeFile(outputPath, render(employees), (err) => err ? console.log("oops something went wrong!") : console.log("Your team.html file has been created, this file is located in the output folder. Enjoy!"))
}

createTeam()
module.exports = employees
    

