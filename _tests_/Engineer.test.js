const Employee = require("../lib/Employee.js");
const Engineer = require("../lib/Engineer.js");

// Test the Employee object
describe("Engineer", () => {
    it("Return object", () => {
        const obj = new Engineer("", "", "", "");

        expect(obj instanceof Engineer).toEqual(true);
    });

    it("Get github", () => {
        const github = "github";

        const engineer = new Engineer("", "", "", github);

        expect(engineer.getGithub()).toEqual("github");
    });

    it("Get role", () => {
        const role = "Engineer";

        const engineer = new Engineer("", "", "", "");

        expect(engineer.getRole()).toEqual(role);
    })
});