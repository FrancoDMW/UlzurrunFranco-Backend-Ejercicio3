const ProductManager = require("./app.js")
const express = require("express")
const { read } = require("fs")

const app = express()

app.get("/", (req, res) => {
    res.send("<h1>Pantalla de inicio</h1> <p>Use las direcciones:</p> <p>'/products': para ver todos los productos</p> <p>'/products/id': para ver el producto con su respectivo id</p>")
})

app.get("/products", (req, res) => {
    let nuevoProducto = new ProductManager("./products.json")
    let products = nuevoProducto.getProducts()
    let { limit } = req.query;
    let intLimit = parseInt(limit)
    console.log(limit)
    if (!intLimit) {
        products.then(pr => {
            console.log(pr)
            res.send(JSON.parse(pr, null, 2))
        }).catch(err => {
            console.log(err)
        })
    } else {
        let prod = []
        let result = []
        for (let i = 0; i < intLimit; i++) {
            products.then(pr => {
                prod = JSON.parse(pr)
                result.push(prod[i])
                console.log(result)
            }).catch(err => {
                console.log(err)
            })
        }
        res.send(result) 
    }
})

app.get("/products/:id", (req, res)=>{
    const id = req.params.id
    let nuevoProducto = new ProductManager("./products.json")
    let products = nuevoProducto.getProducts()
    products.then(pr =>{
        let prod = JSON.parse(pr)
        let produFiltrado= prod.find((p)=> String(p.id) == id)
        if(!produFiltrado){
            res.send("<h1>ERROR: producto no encontrado.</h1>")
        }else{
            res.send(produFiltrado)
        }
    }).catch(err => {
        console.log(err)
    })
})

app.listen(8080, () => {
    console.log("Server run on port 8080")
})