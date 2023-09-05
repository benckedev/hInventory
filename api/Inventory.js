class Inventory {

    #options
    constructor(options = { inventory: [], debug: false }) {

        this.#options = { ...options }

    }
    /**
     * 
     * @returns {Promise | Number}
     */
    async items() {
        const inventoryItems = await this.#options.inventory.all(),
            inventorySize = (inventoryItems.filter(item => item.custom?.hidden != true)).length

        return inventorySize
    }

    /**
     * Get the total size from the user inventory
     * @returns {Promise | Number}
     */
    async size() {
        const inventoryItems = await this.#options.inventory.all(),
            inventoryUpgrade = inventoryItems.filter(item => item.name.startsWith("Inventory Upgrade")).sort((a, b) => b.custom.size - a.custom.size)

        return inventoryUpgrade[0].custom.size
    }
    /**
     * Compare the inventory size + items to add
     * @param {Object} options 
     * @returns {Promise | Boolean}
     */
    async compare(options = { arrayOfItems: Array }) {
        const arraySize = options?.arrayOfItems?.length || 0,
            inventorySize = await this.size()

        if ((inventorySize + arraySize) > inventorySize) return false
        else return true
    }
}

module.exports = Inventory