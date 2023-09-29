const HGI = require('../databases/HgiConexion').HgiConexion
const { obtenerDatosDb_Dash, obtenerDatosDB_Hgi } = require('./Global_Querys')

const GetInfoProductos_Query = async (strIdProducto) => {
    return new Promise(async (resolve, reject) => {
        try {
            const fecha = new Date();
            const year = fecha.getFullYear();
            const month = fecha.getMonth() + 1;
            const query = `SELECT TOP 10 p.StrIdProducto AS referencia, p.StrDescripcion AS descripcion, 
            p.strunidad AS UM,p.strauxiliar as cantxEmpaque, p.strparam2 AS Ubicacion,  p.strparam3 AS medida, pp1.StrDescripcion AS sexo, 
            pp2.StrDescripcion AS Material,  pp3.StrDescripcion AS Marca, 
            p.intprecio1 as precio, 
            (SELECT strarchivo 
            FROM tblimagenes 
            WHERE stridcodigo = p.StrIdProducto AND StrDescripcion = '1') AS productoImg, 
            (SELECT intCantidadFinal 
            FROM qrySaldosInv 
            WHERE strProducto = p.StrIdProducto and IntAno = ${year} and IntPeriodo = ${month} and IntBodega = '01') AS saldoInv
            FROM tblproductos AS p
            INNER JOIN TblProdParametro1 AS pp1 ON pp1.StrIdPParametro1 = p.StrPParametro1
            INNER JOIN TblProdParametro2 AS pp2 ON pp2.StrIdPParametro = p.StrPParametro2
            INNER JOIN TblProdParametro3 AS pp3 ON pp3.StrIdPParametro = p.StrPParametro3
            WHERE StrIdProducto LIKE '${strIdProducto}%'`

            const data = await obtenerDatosDB_Hgi(query)
            resolve(data)
        } catch (error) {
            reject(error)
        }
    })
}

const GetInfoProductos_Nombre_Query = async (strNombre) => {
    return new Promise(async (resolve, reject) => {
        try {
            const fecha = new Date();
            const year = fecha.getFullYear();
            const month = fecha.getMonth() + 1;
            const query = `SELECT TOP 25 p.StrIdProducto AS referencia, p.StrDescripcion AS descripcion, 
            p.strunidad AS UM,p.strauxiliar as cantxEmpaque, p.strparam2 AS Ubicacion,  p.strparam3 AS medida, pp1.StrDescripcion AS sexo, 
            pp2.StrDescripcion AS Material,  pp3.StrDescripcion AS Marca, 
            p.intprecio1 as precio, 
            (SELECT strarchivo 
            FROM tblimagenes 
            WHERE stridcodigo = p.StrIdProducto AND StrDescripcion = '1') AS productoImg, 
            (SELECT intCantidadFinal 
            FROM qrySaldosInv 
            WHERE strProducto = p.StrIdProducto and IntAno = ${year} and IntPeriodo = ${month} and IntBodega = '01') AS saldoInv
            FROM tblproductos AS p
            INNER JOIN TblProdParametro1 AS pp1 ON pp1.StrIdPParametro1 = p.StrPParametro1
            INNER JOIN TblProdParametro2 AS pp2 ON pp2.StrIdPParametro = p.StrPParametro2
            INNER JOIN TblProdParametro3 AS pp3 ON pp3.StrIdPParametro = p.StrPParametro3
            WHERE P.StrDescripcion LIKE '%${strNombre}%'`

            const data = await obtenerDatosDB_Hgi(query)
            resolve(data)
        } catch (error) {
            reject(error)
        }
    })
}

const GetImagenesUnProducto_Query = async (stridproducto) => {
    return new Promise(async (resolve, reject) => {
        try {
            const query = `select StrArchivo from TblImagenes where StrIdCodigo = '${stridproducto}' and IntOrden != 0`
            const data = obtenerDatosDB_Hgi(query)
            resolve(data)
        } catch (error) {
            reject(error)
        }
    })
}

const GetGeneros_Query = async () => {
    return new Promise(async (resolve, reject) => {
        try {
            const query = `select StrIdPParametro1 as id,StrDescripcion as descripcion from TblProdParametro1`
            const data = await obtenerDatosDB_Hgi(query)
            resolve(data)
        } catch (error) {
            reject(error)
        }

    })
}

const GetMateriales_Query = async() => {
    return new Promise(async(resolve, reject) => {
        try {
            const query = `select StrIdPParametro as id,StrDescripcion as descripcion from TblProdParametro2`
            const data = await  obtenerDatosDB_Hgi(query)
            resolve(data)
        } catch (error) {
          reject(error)  
        }
    })
}

const GetMarcas_Query = async () => {
    return new Promise(async (resolve, reject) => {
        try {
            const query = `select StrIdPParametro as id,StrDescripcion as descripcion from TblProdParametro3`
            const data = await obtenerDatosDB_Hgi(query)
            resolve(data)
        } catch (error) {
            reject(error)
        }
    })
}

const GetUnidades_Query = async() => {
    return new Promise(async (resolve, reject) => {
        try {
            const query = `select StrIdUnidad from TblUnidades`
            const data = await obtenerDatosDB_Hgi(query)
            resolve(data)
        } catch (error) {
            reject(error)
        }
    })
}

module.exports = {
    GetGeneros_Query,
    GetMateriales_Query,
    GetMarcas_Query,
    GetUnidades_Query,
    GetInfoProductos_Query,
    GetImagenesUnProducto_Query,
    GetInfoProductos_Nombre_Query
}