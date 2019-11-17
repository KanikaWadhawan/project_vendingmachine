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

  describe('When get the number of coins by coins="toonies"', () => {
    it("should return numCoins = 50", () => {
      expect(venderMachine.getInventoryCoinsByName("toonies")).toEqual(50);
    });
  });

  describe('When get value of the coin by coins="quaters"', () => {
    it("should return value = 0.25", () => {
      expect(venderMachine.getCoinValueByName("quaters")).toEqual(0.25);
    });
  });

  describe("setInventory:", () => {
    describe('When set product inventory position= "A1",number = 2', () => {
      it("should return stock = 9", () => {
        expect(venderMachine.setProductStock("A1", 2)).toEqual(9);
      });
    });
  });

  describe('When set coins inventory name= "toonies",number = 25', () => {
    it("should return coins=75", () => {
      expect(venderMachine.setCoinsInventory("toonies", 25)).toEqual(75);
    });
  });
});
