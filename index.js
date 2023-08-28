require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const port = process.env.PORTSERVER || 8083
const rutas = require('./src/routes')
const path = require('path')
const fs = require('fs')
const {validarCnxDASH} = require('./src/databases/DashConexion')
const {ConexionHgi} = require('./src/databases/HgiConexion')


app.use(cors())
app.use(express.json())
app.use(rutas)

validarCnxDASH()
ConexionHgi()



app.listen(port,()=>{
    console.log(`SERVIDOR FUNCIONANDO EN PUERTO ${port}`)
})


const pdfsFolderPath = path.join(__dirname, 'public', 'pdfs');

app.get('/api/v1/pdfs/:id', (req, res) => {
    const pdfsFolderPath = path.join(__dirname, 'public', 'pdfs', req.params.id);
    fs.readdir(pdfsFolderPath, (err, files) => {
        if (err) {
            res.status(404).send('Error al leer la carpeta de PDFs.');
        } else {
            const fileList = files.filter(file => file.endsWith('.pdf')).map(file => {
                const filePath = path.join(pdfsFolderPath, file);
                const stats = fs.statSync(filePath);
                return {
                    name: file,
                    dateCreated: stats.birthtime, // Fecha de creación
                    dateModified: stats.mtime,   // Fecha de modificación
                };
            });
            res.status(200).json({ fileList });
        }
    });
});

// Configurar la carpeta "pdfs" como carpeta estática
app.use('/api/v1/pdfs', express.static(pdfsFolderPath));