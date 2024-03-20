const sumarDatosProductos = (registro, datosCliente) => {
    console.log("Datos de entrada - registro:", registro);
    console.log("Datos de entrada - datosCliente:", datosCliente);

    const productoMapping = {
        fardo: "fardo",
        pet: "pet",
        garrafones: "garrafa",
        // Añadir más productos según sea necesario
    };

    for (let key in registro) {
        let nombreProducto;
        if (key.endsWith("_in") || key.endsWith("_out")) {
            nombreProducto = key.replace(/_(in|out)$/, ""); // Elimina "_in" o "_out"
        } else {
            nombreProducto = key; // Para claves que no terminan en "_in" o "_out"
        }

        if (
            productoMapping.hasOwnProperty(nombreProducto) &&
            datosCliente.hasOwnProperty(productoMapping[nombreProducto])
        ) {
            let cantidad = parseFloat(registro[key].replace(",", ".")); // Manejar decimales y comas
            console.log(cantidad);

            if (!isNaN(cantidad) && key.endsWith("_out")) {
                datosCliente[productoMapping[nombreProducto]] += cantidad;
            }
        }
    }

    console.log("Datos de salida - datosCliente:", datosCliente);
    console.log("Datos de salida - registro:", registro);
    return datosCliente;
};

// Ejemplo de uso:
const registro = {
    garrafones_in: "2",
    garrafones_out: "2",
    fardo_out: "2",
    pet_out: "2",
};

const datosCliente = {
    id: 3,
    cliente_id: "01",
    fardo: 5,
    garrafa: 3,
    pet: 1
};

const resultado = sumarDatosProductos(registro, datosCliente);
console.log("Resultado:", resultado);
