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

  describe('When get inventory product by position="A1"', () => {
    it("should return stock = 7", () => {
      expect(venderMachine.getInventoryItemByPosition("A1")).toEqual(7);
    });
  });

  describe("When get all the coins", () => {
    it("should return all coins in the inventory", () => {
      expect(venderMachine.getAllInventoryCoins()).toEqual(inventory.coins);
    });
  });
});
