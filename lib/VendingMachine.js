const inventory = require("../inventory.json");

class VendingMachine {
  constructor(inventory) {
    this.inventory = inventory;
  }
  // All the methods would go here
  getAllInventoryProducts() {
    return this.inventory.items;
  }
}

module.exports = VendingMachine;
