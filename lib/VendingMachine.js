const inventory = require("../inventory.json");

class VendingMachine {
  constructor(inventory) {
    this.inventory = inventory;
  }
  // All the methods would go here
  getAllInventoryProducts() {
    return this.inventory.items;
  }
  getItemByPosition(position) {
    return this.inventory.items[position];
  }
  getInventoryItemByPosition(position) {
    return this.inventory.items[position].stock;
  }
}

module.exports = VendingMachine;
