const express = require('express')
const app = express()
const handlebars = require('express-handlebars') //template enginer
const multer = require('multer') //midleware de upload
const storege = multer.diskStorage({
    destination: function (req, file, cb){
        cb(null, "uploads/")
    },
    filename: function (req, file, cb){
        cb(null, file.originalname + '-' + Date.now() + path.extname(file.originalname))
    }
})
const upload = multer({storage: storege})
const path = require('path')
const fs = require('fs')

//config handlebars
app.engine('handlebars', handlebars({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')

//rotas
app.get('/', async(req, res) => {
    await res.status(200).render('index')
})


app.post('/upload', upload.single('file'), async(req, res) => {
    await res.status(200).send('arquivo enviado')
})

app.get('/imgs', (req, res) => {
    res.render('imgs')
})

app.listen(9000, () =>{
    console.log('logado')
})