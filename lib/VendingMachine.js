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

  getProductPriceByPosition(position) {
    return this.inventory.items[position].price;
  }

  getAllInventoryCoins() {
    return this.inventory.coins;
  }
  getInventoryCoinsByName(name) {
    return this.inventory.coins[name].numCoins;
  }

  getCoinValueByName(name) {
    return this.inventory.coins[name].value;
  }

  setNewItemToPosition(position, name, price, stock, maxinventory) {
    this.inventory.items[position] = {
      name: name,
      price: price,
      stock: stock,
      maxinventory: maxinventory
    };
    return this.getItemByPosition(position);
  }
  setProductStock(position, number) {
    const inventory = this.getInventoryItemByPosition(position);
    const maxInventory = this.inventory.items[position].maxinventory;
    const newInventory = inventory + number;
    if (newInventory > maxInventory) {
      throw new Error("Over max spot available");
    } else {
      this.inventory.items[position].stock = newInventory;
      return this.getInventoryItemByPosition(position);
    }
  }

  setCoinsInventory(name, number) {
    const inventory = this.getInventoryCoinsByName(name);
    const maxInventory = this.inventory.coins[name].maxCoins;
    const newInventory = inventory + number;
    if (newInventory > maxInventory) {
      throw new Error("Over max spot available");
    } else {
      this.inventory.coins[name].numCoins = newInventory;
      return this.getInventoryCoinsByName(name);
    }
  }
}

module.exports = VendingMachine;
