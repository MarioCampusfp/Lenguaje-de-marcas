// Ejecutar este archivo a través de un servidor local para evitar errores con fetch.
document.addEventListener("DOMContentLoaded", () => {
	// Cargar el archivo JSON de datos
	fetch('data/petStore.json')
		.then(response => response.json())
		.then(data => {
			console.log("Datos cargados correctamente");
			renderOrders(data);
			renderCustomers(data);
			renderInvoice(data);
			renderProducts(data, '2023', 'Q1', 'productsQ1_2023');
			renderProducts(data, '2024', 'Q4', 'productsQ4_2024');
		})
		.catch(error => console.error('Error cargando los datos:', error));
});

function renderOrders(data) {
	const ordersTableBody = document.querySelector("#ordersTable tbody");
	// Recorrer todos los años y trimestres
	for (const year in data) {
		for (const quarter in data[year]) {
			data[year][quarter].forEach(order => {
				const tr = document.createElement("tr");
				tr.innerHTML = `
					<td>${order.orderNumber}</td>
					<td>${order.purchaseDate}</td>
					<td>${order.deliveryDate}</td>
					<td>${order.invoiceTotal}</td>
					<td>${order.customer.nombre} ${order.customer.apellidos}</td>
				`;
				ordersTableBody.appendChild(tr);
			});
		}
	}
}

function renderCustomers(data) {
	const customersTableBody = document.querySelector("#customersTable tbody");
	const clientes = {};
	// Recorrer para extraer clientes únicos
	for (const year in data) {
		for (const quarter in data[year]) {
			data[year][quarter].forEach(order => {
				const key = order.customer.email;
				if (!clientes[key]) {
					clientes[key] = order.customer;
				}
			});
		}
	}
	for (const key in clientes) {
		const c = clientes[key];
		const tr = document.createElement("tr");
		tr.innerHTML = `
			<td>${c.nombre}</td>
			<td>${c.apellidos}</td>
			<td>${c.telefono}</td>
			<td>${c.direccion.calle}, ${c.direccion.ciudad}, ${c.direccion.codigoPostal}, ${c.direccion.provincia}</td>
			<td>${c.email}</td>
		`;
		customersTableBody.appendChild(tr);
	}
}

function renderInvoice(data) {
	// Seleccionar el primer pedido encontrado para mostrar su factura
	for (const year in data) {
		for (const quarter in data[year]) {
			if (data[year][quarter].length > 0) {
				const order = data[year][quarter][0];
				const invoiceDiv = document.getElementById("invoice");
				invoiceDiv.innerHTML = `
					<h3>Factura - Pedido ${order.orderNumber}</h3>
					<p><strong>Cliente:</strong> ${order.customer.nombre} ${order.customer.apellidos}</p>
					<p><strong>Teléfono:</strong> ${order.customer.telefono}</p>
					<p><strong>Dirección:</strong> ${order.customer.direccion.calle}, ${order.customer.direccion.ciudad}</p>
					<p><strong>Correo:</strong> ${order.customer.email}</p>
					<hr>
					<p><strong>Producto:</strong> ${order.product.nombre}</p>
					<p><strong>Referencia:</strong> ${order.product.referencia}</p>
					<p><strong>Precio:</strong> ${order.product.precio}</p>
					<p><strong>Unidades:</strong> ${order.product.unidades}</p>
					<hr>
					<p><strong>Total Factura:</strong> ${order.invoiceTotal}</p>
				`;
				return;
			}
		}
	}
}

function renderProducts(data, yearToShow, quarterToShow, tableId) {
	const tableBody = document.getElementById(tableId).querySelector("tbody");
	if (data[yearToShow] && data[yearToShow][quarterToShow]) {
		data[yearToShow][quarterToShow].forEach(order => {
			const { nombre, referencia, precio, unidades } = order.product;
			const tr = document.createElement("tr");
			tr.innerHTML = `
				<td>${nombre}</td>
				<td>${referencia}</td>
				<td>${precio}</td>
				<td>${unidades}</td>
			`;
			tableBody.appendChild(tr);
		});
	}
}
