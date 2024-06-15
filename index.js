//Iniciando Server

const express = require('express')
const app = express()
const morgan = require('morgan')

//Importar Modulos
const { insertar, consultar, actualizar, eliminar, transferir, consultarTransf } = require('./db')

app.listen(3000, () => {
    console.log("App escuchando puerto 3000")
})

// Middleware
app.use(express.json())
app.use(morgan('dev'))
//Ruta inicial
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html")
})

//Ruta para insertar (Metodo Post)
app.post("/usuario", async (req, res) => {
    // Obtenemos información del formulario
    const payload = req.body

    //Conección con modulo DB para Aplicar consulta Insertar
    try {
        const response = await insertar(payload)

        res.send(response.rows)
    } catch (error) {
        // Definimos código de estado
        res.statusCode = 500
        res.json({ error: 'Algo salió mal, intentalo más tarde' })
    }
})

//Ruta Get para Obtener valores
app.get("/usuarios", async (req, res) => {
    try {
        const response = await consultar()

        res.send(response.rows)
    } catch (error) {
        console.log(error)
        res.statusCode = 500
        res.json({ error: "Algo salió mal" })
    }
})

//Ruta Put para actualizar registros
app.put("/usuario", async (req, res) => {
    const { id } = req.query;
    const payload = req.body;
    payload.id = id

    try {
        const result = await actualizar(payload)
        res.send(result)

    } catch (error) {

        console.log(error)

        res.statusCode = 500

        res.json({ error: 'Algo salió mal' })

    }
})

//Ruta delete para Elimina
app.delete("/usuario", async (req, res) => {
    const { id } = req.query

    try {
        const result = await eliminar(id);
        res.send(result)

    } catch (error) {
        res.statusCode = 500
        res.json({ error: 'Algo salió mal' })
    }
})

app.post("/transferencia", async (req, res) => {
    // Obtenemos información del formulario
    const payload = req.body
    //Definimos Payload Fecha
    const fecha = new Date();
    payload.fecha = fecha;
    //Conección con modulo DB para Aplicar consulta Insertar
    try {
        const response = await transferir(payload)

        res.send(response.rows)
    } catch (error) {
        // Definimos código de estado
        res.statusCode = 500
        res.json({ error: 'Algo salió mal, intentalo más tarde' })
    }
})
app.get("/transferencias", async (req, res) => {
    try {
        const result = await consultarTransf()

        res.json(result)
    } catch (error) {
        res.statusCode = 500;
        res.json({ error: 'Error en BD.' });
    }
})