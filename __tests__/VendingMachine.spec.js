const inventory = require("../inventory.json");
const VendingMachine = require("../lib/VendingMachine");

let venderMachine;

describe("Vending Machine", () => {
  beforeEach(() => {
    // Reset inventory
    venderMachine = new VendingMachine(inventory);
  });

  describe("getInventory:", () => {
    describe("When get all the products of inventory", () => {
      it("should return all products of inventory", () => {
        expect(venderMachine.getAllInventoryProducts()).toEqual(
          inventory.items
        );
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

    describe('When set products inventory position= "toonies",number = 26', () => {
      it("should throw Error", () => {
        expect(() => venderMachine.setCoinsInventory("toonies", 26)).toThrow(
          "Over max spot available"
        );
      });
    });
    describe('When set new product to position= "A5", name=Jalepeno Durritos, price=3, stock=6, maxinventory=10', () => {
      it("should return new product detail by position", () => {
        expect(
          venderMachine.setNewItemToPosition(
            "A5",
            "Jalepeno Durritos",
            3,
            6,
            10
          )
        ).toEqual({
          name: "Jalepeno Durritos",
          price: 3,
          stock: 6,
          maxinventory: 10
        });
      });
    });
    describe("Dispense Products:", () => {
      describe("When giving change amount = 13.4", () => {
        it("should return change = 13.4", () => {
          expect(venderMachine.dispenseChanges(13.4)).toEqual(13.4);
          expect(venderMachine.getAllInventoryCoins()).toEqual(inventory.coins);
        });
      });
    });
    describe('When getting amount = 5, position="A1"', () => {
      it("should return true", () => {
        expect(venderMachine.dispenseProduct("A1", 5)).toEqual(true);
        expect(venderMachine.getAllInventoryCoins()).toEqual(inventory.coins);
        expect(venderMachine.getInventoryItemByPosition("A1")).toEqual(8);
      });
    });
  });
});
