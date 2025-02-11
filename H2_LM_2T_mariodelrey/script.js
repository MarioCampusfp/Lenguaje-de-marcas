// Cargar datos JSON y mostrar en las tablas
document.addEventListener("DOMContentLoaded", () => {
    fetch('./data.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log('Datos JSON cargados:', data); // Mensaje de depuración
            mostrarPedidos(data);
            mostrarProductos(data);
            mostrarClientes(data);
            crearFactura(data);
        })
        .catch(error => {
            console.error('Hubo un problema con la solicitud Fetch:', error);
        });
});

function mostrarPedidos(data) {
    const tablaPedidos = document.getElementById("tabla_pedidos").getElementsByTagName('tbody')[0];
    console.log('Mostrando pedidos...'); // Mensaje de depuración
    
    // Recorrer el JSON de pedidos de 2023 y 2024
    Object.keys(data).forEach(anio => {
        Object.keys(data[anio]).forEach(trimestre => {
            data[anio][trimestre].forEach(pedido => {
                const fila = tablaPedidos.insertRow();
                fila.innerHTML = `
                    <td>${pedido.pedido_id}</td>
                    <td>${pedido.cliente.nombre} ${pedido.cliente.apellidos}</td>
                    <td>${pedido.fecha_compra}</td>
                    <td>${pedido.total_factura}€</td>
                    <td>
                        ${pedido.productos.map(p => `${p.nombre} (${p.unidades} unidades)`).join(', ')}
                    </td>
                `;
            });
        });
    });
}

function mostrarProductos(data) {
    const tablaProductos = document.getElementById("tabla_productos").getElementsByTagName('tbody')[0];
    console.log('Mostrando productos...'); // Mensaje de depuración

    // Mostrar productos del Q1 2023 y Q4 2024
    const trimestres = [
        { anio: '2023', trimestre: 'Q1' },
        { anio: '2024', trimestre: 'Q4' }
    ];

    trimestres.forEach(t => {
        data[t.anio][t.trimestre].forEach(pedido => {
            pedido.productos.forEach(producto => {
                const fila = tablaProductos.insertRow();
                fila.innerHTML = `
                    <td>${producto.nombre}</td>
                    <td>${producto.referencia}</td>
                    <td>${producto.precio}€</td>
                    <td>${producto.unidades}</td>
                `;
            });
        });
    });
}

function mostrarClientes(data) {
    const tablaClientes = document.getElementById("tabla_clientes").getElementsByTagName('tbody')[0];
    let clientesUnicos = {};
    // Recorrer todos los pedidos
    Object.keys(data).forEach(anio => {
        Object.keys(data[anio]).forEach(trimestre => {
            data[anio][trimestre].forEach(pedido => {
                let cliente = pedido.cliente;
                // Usa el email como identificador único
                if (!clientesUnicos[cliente.email]) {
                    clientesUnicos[cliente.email] = cliente;
                }
            });
        });
    });
    // Mostrar los clientes
    Object.values(clientesUnicos).forEach(cliente => {
        const fila = tablaClientes.insertRow();
        fila.innerHTML = `
            <td>${cliente.nombre}</td>
            <td>${cliente.apellidos}</td>
            <td>${cliente.telefono}</td>
            <td>${cliente.direccion.calle}, ${cliente.direccion.ciudad}, ${cliente.direccion.codigo_postal}, ${cliente.direccion.provincia}</td>
            <td>${cliente.email}</td>
        `;
    });
}

function crearFactura(data) {
    // Selecciona el primer pedido de Q1 2023 como ejemplo de factura
    const pedido = data["2023"]["Q1"][0];
    const facturaDiv = document.getElementById("detalle_factura");
    let productosHTML = pedido.productos.map(p => `
        <tr>
            <td>${p.nombre}</td>
            <td>${p.referencia}</td>
            <td>${p.precio}€</td>
            <td>${p.unidades}</td>
        </tr>
    `).join('');
    
    facturaDiv.innerHTML = `
        <h3>Factura - Pedido ${pedido.pedido_id}</h3>
        <p><strong>Cliente:</strong> ${pedido.cliente.nombre} ${pedido.cliente.apellidos}</p>
        <p><strong>Fecha de Compra:</strong> ${pedido.fecha_compra}</p>
        <p><strong>Fecha de Entrega:</strong> ${pedido.fecha_entrega}</p>
        <p><strong>Total Factura:</strong> ${pedido.total_factura}€</p>
        <table>
            <thead>
                <tr>
                    <th>Producto</th>
                    <th>Referencia</th>
                    <th>Precio</th>
                    <th>Unidades</th>
                </tr>
            </thead>
            <tbody>
                ${productosHTML}
            </tbody>
        </table>
    `;
}
