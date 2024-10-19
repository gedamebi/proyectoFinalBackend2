
import { ProductService } from '../services/index.js'
import { isNumeric } from '../utils.js'

export const createProduct = async (req, res) => {
    const dataProducto = req.body
    /* let thumbnails = []
    if (req.files){
        thumbnails = req.files ? req.files.map(file => 'img/' + file.filename) : [];
    } */
    
    const { title, description, code, price, stock, category } = dataProducto
    if (!title || !description || !code || !price || !stock || !category) {
        return res.status(400).json({ error: 'Todos los campos son obligatorios, excepto thumbnails' })
    }

    if (!isNumeric(price) || !isNumeric(stock)){
        return res.status(400).json({ error: 'Datos numericos invalidos' })
    }

    try {
        
        await ProductService.createProduct({
            title, 
            description, 
            code, 
            price, 
            stock, 
            category
            /* thumbnails */
        })
        res.status(201).json({ message: 'Producto agregado correctamente' })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error.message })
    }
}

export const updateProduct = async (req, res) => {
    const { pid } = req.params
    const productReq = req.body
    const { price, stock } = productReq
    if ((price && !isNumeric(price)) || (stock && !isNumeric(stock))){
        return res.status(400).json({ error: 'Datos numericos invalidos' })
    }

    try {
        const productUpdated = await ProductService.updateproducts(pid, productReq)

        res.status(200).json({ resultado: 'Producto modificado correctamente', payload: productUpdated })     
    } catch (error) {
        res.status(500).json({ message: error.message })
    }

}

export const deleteProduct = async (req, res) => {
    const { pid } = req.params
    try {
        const retorno = await ProductService.deleteProductbyId(pid);
        if (retorno){
            res.status(200).json({ resultado: 'Producto eliminado correctamente' })
        } else {
            res.status(404).json({ resultado: 'Producto no encontrado' })
        }      
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const getProducts = async (req, res) => {
    const { limit = 10, page = 1, sort = '', query } = req.query

    const filter = {}
    if (query) {
        try {
            Object.assign(filter, JSON.parse(query));
        } catch (e) {
            return res.status(400).send('El parámetro de consulta "query" no es válido.');
        }
    }

    const sortManager = {
        'asc': 1,
        'dsc': -1
    }

    try {
        const options = {
            page: parseInt(page),
            limit: parseInt(limit),
            ...(sort && { sort: { price: sortManager[sort]} }),
            customLabels: { docs: 'payload' }
        };
        const resultado = await ProductService.paginateProduct(filter, options)
        res.status(200).json({resultado, status: 'success'})
    } catch (error) {
        res.status(500).send({error: error.message, status: 'error'});
    }
}


export const getProduct = async (req, res) => {
    const { pid } = req.params;  
    const product = await ProductService.getProductsbyId(pid)
    if (product == false){
        res.status(404).json({ message: "Producto no encontrado" })
    } else {
        res.status(200).json({ resultado: product })
    }
}









