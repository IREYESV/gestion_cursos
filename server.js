const { agregar_curso, consultar, actualizar, eliminar_curso } = require('./db');
const pg = require('pg')
const express = require('express')
const nunjucks=require('nunjucks')
const app = express()
const bodyParser= require('body-parser')



app.use(express.static("static"))

nunjucks.configure('templates', {
    express: app,
    autoescape: true,
    watch: true
})
app.get(`/`, async (req, res) => {
    res.render(`index.html`)
})

app.post('/curso', async (req, res) => {
    console.log(req.body)
    await agregar_cursos(req.body.nombre, req.body.nivelTecnico, req.body.fechaInicio, req.body.duracion);
    res.json({todo:'okey'})
}) 

app.get('/cursos', async(req, res) => {
    let all_cursos;
    try {
        all_cursos = await consultar();
    } catch (error) {
        console.log("Error de consulta es: get cursos " + error);
        return res.send(error);
    }
    res.json(all_cursos);
});

app.put('/curso', async(req, res) => {

    console.log(req.body.fechaInicio);
    console.log(typeof(req.body.fechaInicio));
    console.log(req.body);

    await actualizar(req.body.nombre, req.body.nivelTecnico, req.body.fechaInicio, req.body.duracion);
    res.json({ Todo: 'ok' })
});

app.delete('/curso/:id', async(req, res) => {
    try {
        await eliminar_curso(parseInt(req.params.id));
        res.send('eliminado');
    } catch (error) {
        console.log("error" + error);
    }
});


app.listen(3000, () => console.log("servidor corriendo en el puerto 3000"));
