const route = require('express').Router()
const {
    GetPedidosEnProceso,
    GetPedidosNuevos,
    GetPedidosEnTerminal,
    GetInfoPedido,
    GetInfoPedidoTerminal,
    GetPedidoXId,
    GetPedidos,
    PutEstadoPedido,
    PutEstadoProductoPedido,
    PostProductoPedido,
    PutActualizarPreciosPedido,
} = require('../../controllers/v1/Pedidos/Pedidos_Controller')

const {
    ConsultarEncargados,
    obtenerDatosSeguimiento,
    AgregarSeguimiento,
    ObtenerSeguimientos,
    ConsultarEncargadosDefault,
    CrearEncargado,
    BuscarSeguimiento
} = require('../../controllers/v1/Pedidos/Seguimientos_Controller')

route.get('/', GetPedidos)
route.get('/nuevos', GetPedidosNuevos)
route.get('/proceso', GetPedidosEnProceso)
route.get('/terminal', GetPedidosEnTerminal)
route.get('/encargados', ConsultarEncargados)
route.get('/seguimiento', obtenerDatosSeguimiento)
route.get('/seguimientos', ObtenerSeguimientos)
route.get('/seguimientos/id/:busqueda', BuscarSeguimiento)
route.get('/detalle_pedido/terminal/:id', GetInfoPedidoTerminal)
route.get('/detalle_pedido/:id', GetInfoPedido)
route.get('/id/:id', GetPedidoXId)

route.get('/encargadosDefault', ConsultarEncargadosDefault)

route.put('/actualizar_estado', PutEstadoPedido)
route.put('/producto', PutEstadoProductoPedido)
route.put('/precios_productos', PutActualizarPreciosPedido)

route.post('/seguimiento', AgregarSeguimiento)
route.post('/producto', PostProductoPedido)
route.post('/encargado', CrearEncargado)


module.exports = route