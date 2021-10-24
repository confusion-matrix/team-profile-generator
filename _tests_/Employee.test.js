const Employee = require("../lib/Employee.js");

// Test the Employee object
describe('Employee', () => {
    it("Get the name of the employee object", () => {
        const employee = new Employee("testName", "testID", "testEmail");
        expect(employee.getName()).toBe("testName");
        expect(employee.getId()).toBe("testID");
        expect(employee.getEmail()).toBe("testEmail");
    });
});

describe("getName", () => {
    it("Return object", () => {
        const obj = new Employee("", "", "");

        expect(obj instanceof Employee).toEqual(true);
    });

    it("Get name", () => {
        const name = "newName";

        const employee = new Employee(name, "", "");

        expect(employee.getName()).toEqual("newName");
    });
});