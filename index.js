// ------- Modulo de OS -------

const os = require('os');
console.log("\n------ Información OS ------")

const currentOS = {
    user: os.userInfo(),
    name: os.type(),
    release: os.release()
}

console.log(currentOS)

// ------- Modulo de rutas -------

const path = require('path');

console.log("\n------ Manejo de rutas ------")

let ruta = path.resolve('index.js')
console.log(`Ruta actual: ${ruta}`)

let directorio = path.dirname(ruta);
console.log(`Directorio: ${directorio}`)

let extname = path.extname(ruta)
console.log(`Extension archivo: ${extname}`)

let user = "Jonh";
let img = "img.jpg";
let rutaFinal = path.join(__dirname, user, img)
console.log(`Ruta construida: ${rutaFinal}`)

// ------- Filesystem -------

const fs = require('fs');

console.log("\n------ Sistema de archivos ------")
fs.writeFileSync('test.txt', 'Hola Mundo!');
console.log(`creando archivo test.txt ....`)
fs.readFile('test.txt', (err, data) => {
    if (err) {
        console.error(err)
    }
    console.log(`leyendo archivo: ${data.toString()}`)
})

const stats = fs.statSync('test.txt');
console.log(`peso del archivo: ${stats.size}`)