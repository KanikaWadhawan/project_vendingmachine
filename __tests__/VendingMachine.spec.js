// al the tests would go here

const inventory = require("../inventory.json");
const VendingMachine = require("../lib/VendingMachine");
const venderMachine = new VendingMachine(inventory);

describe("getInventory:", () => {
  describe("When get all the products of inventory", () => {
    it("should return all products of inventory", () => {
      expect(venderMachine.getAllInventoryProducts()).toEqual(inventory.items);
    });
  });
});
