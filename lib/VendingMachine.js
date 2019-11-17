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
    console.log(this.inventory.coins);
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
  checkChange(array, amount) {
    array.map((change, index) => {
      if (amount >= change.value) {
        const numberOfChange = Math.floor(amount / change.value);
        if (this.getInventoryCoinsByName(change.name) >= numberOfChange) {
          array[index].number = numberOfChange;
          amount = parseFloat(
            (amount - change.value * numberOfChange).toFixed(2)
          );
        } else {
          array[index].number = this.getInventoryCoinsByName(change.name);
          amount = parseFloat(
            (
              amount -
              change.value * this.getInventoryCoinsByName(change.name)
            ).toFixed(2)
          );
          if (change.name === "nicles") {
            if (this.getInventoryCoinsByName("dimes") >= array[5].number + 3) {
              array[4].number--;
              array[5].number += 3;
              amount = amount - 0.05;
            } else {
              throw new Error(
                "Sorry, not enough changes to give back, please try again"
              );
            }
          }
        }
      }
    });
    if (amount !== 0) {
      throw new Error(
        "Sorry, not enough changes to give back, please try again"
      );
    }
  }

  dispenseChanges(changeAmount) {
    let coins = [
      { name: "tens", number: 0, value: 10 },
      { name: "fives", number: 0, value: 5 },
      { name: "toonies", number: 0, value: 2 },
      { name: "loonies", number: 0, value: 1 },
      { name: "quaters", number: 0, value: 0.25 },
      { name: "dimes", number: 0, value: 0.1 },
      { name: "nicles", number: 0, value: 0.05 }
    ];
    this.checkChange(coins, changeAmount);
    console.log("coins: \n", coins);
    coins.map((change, index) =>
      this.setCoinsInventory(change.name, -change.number)
    );
    return coins.reduce(
      (acc, current) => (acc = acc + current.number * current.value),
      0
    );
  }

  dispenseProduct(position, amount) {
    if (amount > 20) {
      throw new Error("Not accept bill larger than 20");
    } else if (amount < this.getProductPriceByPosition(position)) {
      throw new Error("Not Enough Balance");
    } else if (!this.getProductPriceByPosition(position)) {
      throw new Error("Product Out of Stock");
    } else {
      let changeAmount = amount - this.getProductPriceByPosition(position);
      this.dispenseChanges(changeAmount);
      this.setProductStock(position, -1);
      return true;
    }
    return false;
  }
}

module.exports = VendingMachine;
