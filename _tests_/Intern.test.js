const Employee = require("../lib/Employee.js");
const Intern = require("../lib/Intern.js");

// Test the Employee object
describe("Engineer", () => {
    it("Return object", () => {
        const obj = new Intern("", "", "", "");

        expect(obj instanceof Intern).toEqual(true);
    });

    it("Get school", () => {
        const school = "school";

        const intern = new Intern("", "", "", school);

        expect(intern.getSchool()).toEqual("school");
    });

    it("Get role", () => {
        const role = "Intern";

        const intern = new Intern("", "", "", "");

        expect(intern.getRole()).toEqual(role);
    })
});