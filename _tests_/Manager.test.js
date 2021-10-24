const Employee = require("../lib/Employee.js");
const Manager = require("../lib/Manager.js");

describe("Manager", () => {
    it("Return object", () => {
        const obj = new Manager("", "", "", "");

        expect(obj instanceof Manager).toEqual(true);
    });

    it("Get id", () => {
        const officeId = "id";

        const manager = new Manager("", "", "", officeId);

        expect(manager.getOfficeNumber()).toEqual("id");
    });

    it("Get role", () => {
        const role = "Manager";

        const manager = new Manager("", "", "", "");

        expect(manager.getRole()).toEqual(role);
    })
});