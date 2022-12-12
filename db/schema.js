const {gql} = require('apollo-server');

// creamos schema
const typeDefs = gql`

    # TABLAS

    type Usuario {
        id: ID
        nombre: String
        apellido: String
        email: String
        password: String
        creado: String
    }

    type Producto {
        id: ID
        nombre: String
        existencia: Int
        precio: Float
        creado: String
    }

    type Cliente {
        id: ID
        nombre: String
        apellido: String
        empresa: String
        email: String
        telefono: String
        vendedor: ID
    }    
    
    type PedidoGrupo{
        id: ID
        cantidad: Int
        nombre: String
        precio: Float
    }

    type Pedido {
        id: ID
        pedido: [PedidoGrupo]
        total: Float
        cliente: ID
        vendedor: ID
        fecha: String
        estado: EstadoPedido
    }

    type TopCliente {
        total: Float
        cliente: [Cliente]
    }

    type TopVendedor {
        total: Float
        vendedor: [Usuario]
    }

    # OBJETOS

    type Token {
        token: String
    }

    # INPUTS

    input usuarioInput {
        nombre: String!
        apellido: String!
        email: String!
        password: String!
    }

    input productoInput {
        nombre: String!
        existencia: Int!
        precio: Float!
    }

    input AutenticarInput {
        email: String!
        password: String!
    }

    input ClienteInput {
        nombre: String!
        apellido: String!
        empresa: String!
        email: String!
        telefono: String
    }

    input PedidoProductoInput {
        id: ID
        cantidad: Int
        nombre: String
        precio: Float
    }

    input PedidoInput {
        pedido: [PedidoProductoInput]
        total: Float!
        cliente: ID!
        estado: EstadoPedido
    }

    # ENUM

    enum EstadoPedido {
        PENDIENTE
        COMPLETADO
        CANCELADO
    }

    # QUERYS o SELECTS

    type Query {
        # Usuarios
        obtenerUsuario(token: String!) : Usuario

        # Productos
        obtenerProductos: [Producto]
        obtenerProducto(id: ID!): Producto

        # Cliente
        obtenerClientes: [Cliente]
        obtenerClientesVendedor: [Cliente]
        obtenerCliente(id:ID!): Cliente
        
        # Pedidos
        obtenerPedidos: [Pedido]
        obtenerPedidosVendedor: [Pedido]
        obtenerPedido(id: ID!) : Pedido
        obtenerPedidosEstado(estado: String!): [Pedido]

        # Busquedas Avanzadas
        mejoresClientes: [TopCliente]
        mejoresVendedores: [TopVendedor]
        buscarProducto(texto: String!) : [Producto]
    }

    # MUTATIONS o INSERTS,UPDATE y DELETE

    type Mutation {        
        # Usuarios
        nuevoUsuario (input: usuarioInput) : Usuario
        autenticarUsuario (input: AutenticarInput) : Token

        # Productos
        nuevoProducto(input: productoInput) : Producto
        actualizarProducto(id: ID!, input: productoInput) : Producto
        eliminarProducto(id: ID!) : String

        # Clientes
        nuevoCliente(input: ClienteInput) : Cliente
        actualizarCliente(id: ID!, input: ClienteInput): Cliente
        eliminarCliente(id: ID!): String
        
        # Pedidos
        nuevoPedido(input: PedidoInput): Pedido
        actualizarPedido(id: ID!, input: PedidoInput ) : Pedido
        eliminarPedido(id: ID!) : String
    }
`;

module.exports = typeDefs;