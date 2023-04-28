const fs = require("fs");

class ProductManager {
    constructor() {
        this.path = "./products.json"
        this.products = [];
        this.productId = 1;
    }

    async getProducts() {
        let archivo = await fs.promises.readFile(this.path, "utf-8")
        return archivo
        /*try {
            const data = await fs.readFile(this.path);
            this.products = JSON.parse(data);
        } catch (err) {
            if (err.code === "ENOENT") {
                this.products = [];
            } else {
                throw err;
            }
        }
        return this.products;*/
    }

    async addProduct(product) {
        const id = this.productId++;
        product.id = id;
        await this.getProducts();
        this.products.push(product);
        await fs.writeFile(this.path, JSON.stringify(this.products, null, 2), "utf-8");
    }

    async getProductById(id) {
        await this.getProducts();
        const productId = this.products.find(product => product.id === id);
        if (productId) {
            console.log("entro aca pero no me muestra el contenido")
            return productId;
        }else{
            throw new Error(`Error! no se encontro ese id`);
        }
        
    }

    async updateProduct(id, updates) {
        await this.getProducts();
        const productIndex = this.products.findIndex((product) => product.id === id);
        if (productIndex === -1) {
            throw new Error(`Error! no se encontro ese id`);
        }
        const updatedProduct = Object.assign({}, this.products[productIndex], updates);
        this.products[productIndex] = updatedProduct;
        await fs.writeFile(this.path, JSON.stringify(this.products, null, 2), "utf-8");
    }

    async deleteProduct(id) {
        await this.getProducts();
        const productIndex = this.products.findIndex((product) => product.id === id);
        if (productIndex === -1) {
            throw new Error(`Error! no se encontro ese id`);
        }
        this.products.splice(productIndex, 1);
        await fs.writeFile(this.path, JSON.stringify(this.products, null, 2), "utf-8");
    }
}

/*const productManager = new ProductManager();
(async () => {
    console.log(await productManager.getProducts());
    const productoUno = {
        title: "Dragon Ball 1",
        description: "Manga de Accion",
        price: 1800,
        thumbnail: "Sin imagen",
        code: "q1w2e3",
        stock: 10,
    };
    const productoDos = {
        title: "Dragon Ball 2",
        description: "Manga de Accion",
        price: 1800,
        thumbnail: "Sin imagen",
        code: "q1w2e3",
        stock: 10,
    };
    const productoTres = {
        title: "Dragon Ball 3",
        description: "Manga de Accion",
        price: 1800,
        thumbnail: "Sin imagen",
        code: "q1w2e3",
        stock: 10,
    };
    const productoCuatro = {
        title: "Dragon Ball 4",
        description: "Manga de Accion",
        price: 1800,
        thumbnail: "Sin imagen",
        code: "q1w2e3",
        stock: 10,
    };
    const productoCinco = {
        title: "Dragon Ball 5",
        description: "Manga de Accion",
        price: 1800,
        thumbnail: "Sin imagen",
        code: "q1w2e3",
        stock: 10,
    };
    const productoSeis = {
        title: "Dragon Ball 6",
        description: "Manga de Accion",
        price: 1800,
        thumbnail: "Sin imagen",
        code: "q1w2e3",
        stock: 10,
    };
    const productoSiete = {
        title: "Dragon Ball 7",
        description: "Manga de Accion",
        price: 1800,
        thumbnail: "Sin imagen",
        code: "q1w2e3",
        stock: 10,
    };
    const productoOcho = {
        title: "Dragon Ball 8",
        description: "Manga de Accion",
        price: 1800,
        thumbnail: "Sin imagen",
        code: "q1w2e3",
        stock: 10,
    };
    const productoNueve = {
        title: "Dragon Ball 9",
        description: "Manga de Accion",
        price: 1800,
        thumbnail: "Sin imagen",
        code: "q1w2e3",
        stock: 10,
    };
    const productoDiez = {
        title: "Dragon Ball 10",
        description: "Manga de Accion",
        price: 1800,
        thumbnail: "Sin imagen",
        code: "q1w2e3",
        stock: 10,
    };
    await productManager.addProduct(productoUno);
    await productManager.addProduct(productoDos);
    await productManager.addProduct(productoTres);
    await productManager.addProduct(productoCuatro);
    await productManager.addProduct(productoCinco);
    await productManager.addProduct(productoSeis);
    await productManager.addProduct(productoSiete);
    await productManager.addProduct(productoOcho);
    await productManager.addProduct(productoNueve);
    await productManager.addProduct(productoDiez);
    console.log(await productManager.getProducts());
    const productIdUpdate = 3;
    const productToUpdate = {
        price: 10000,
        stock: 9,
    };
    await productManager.updateProduct(productIdUpdate, productToUpdate);
    console.log(await productManager.getProducts());
    const productIdGetBy = 1
    await productManager.getProductById(productIdGetBy);
    const productIdDelete = 2
    await productManager.deleteProduct(productIdDelete);
    console.log(await productManager.getProducts());
})();*/
module.exports = ProductManager