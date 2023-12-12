import React, { useState, useEffect } from "react";
import jsPDF from "jspdf";

export default function Facturacion({ id }) {
  const [cliente, setCliente] = useState({
    unique_id: "",
    nombre: "",
    apellido: "",
    telefono: "",
    direccion: "",
    n_documento: "",
  });

  const [facturacion, setFacturacion] = useState({
    cliente_id: "",
    fardos: 0,
    garrafas: 0,
    pet: 0,
    total: 0,
  });

  const [precioEspecial, setPrecioEspecial] = useState({
    precio_fardos: 0,
    precio_garrafas: 0,
    precio_pet: 0,
  });

  useEffect(() => {
    // Obtener información del cliente
    fetch(`http://localhost/api/clientes/${id}`)
      .then((response) => response.json())
      .then((data) => setCliente(data))
      .catch((error) =>
        console.error("Error al obtener datos del cliente:", error)
      );

    // Obtener información de facturación
    fetch(`http://localhost/api/registro/daily/${id}`)
      .then((response) => response.json())
      .then((data) => setFacturacion(data))
      .catch((error) =>
        console.error("Error al obtener datos de facturación:", error)
      );

    // Obtener precios especiales
    fetch(`http://localhost/api/precio-especial/${facturacion.cliente_id}`)
      .then((response) => response.json())
      .then((data) => setPrecioEspecial(data))
      .catch((error) =>
        console.error("Error al obtener precios especiales:", error)
      );
  }, [id, facturacion.cliente_id]);

  const generatePDF = () => {
    // Crear un nuevo documento PDF con dimensiones personalizadas
    const doc = new jsPDF({
      unit: "mm",
      format: [215, 275], // Ancho x Alto
    });

    // Agregar información del cliente al PDF
    doc.text(`Nombre: ${cliente.nombre} ${cliente.apellido}`, 10, 10);
    doc.text(`Teléfono: ${cliente.telefono}`, 10, 20);
    doc.text(`Dirección: ${cliente.direccion}`, 10, 30);
    doc.text(`N° Documento: ${cliente.n_documento}`, 10, 40);

    // Agregar información de facturación al PDF
    doc.text(
      `Fardos: ${facturacion.fardos} - Precio Unitario: ${precioEspecial.precio_fardos}`,
      10,
      50
    );
    doc.text(
      `Garrafas: ${facturacion.garrafas} - Precio Unitario: ${precioEspecial.precio_garrafas}`,
      10,
      60
    );
    doc.text(
      `PET: ${facturacion.pet} - Precio Unitario: ${precioEspecial.precio_pet}`,
      10,
      70
    );

    // Otro contenido del PDF...
    doc.text("Contenido adicional del PDF", 10, 80);

    // Guardar el PDF con un nombre específico
    doc.save("facturacion.pdf");
  };

  const printPDF = () => {
    // Crear un nuevo documento PDF para impresión
    const doc = new jsPDF({
      unit: "mm",
      format: [215, 275], // Ancho x Alto
    });

    // Agregar información del cliente al PDF
    doc.text(`Nombre: ${cliente.nombre} ${cliente.apellido}`, 10, 10);
    doc.text(`Teléfono: ${cliente.telefono}`, 10, 20);
    doc.text(`Dirección: ${cliente.direccion}`, 10, 30);
    doc.text(`N° Documento: ${cliente.n_documento}`, 10, 40);

    // Agregar información de facturación al PDF
    doc.text(
      `Fardos: ${facturacion.fardos} - Precio Unitario: ${precioEspecial.precio_fardos}`,
      10,
      50
    );
    doc.text(
      `Garrafas: ${facturacion.garrafas} - Precio Unitario: ${precioEspecial.precio_garrafas}`,
      10,
      60
    );
    doc.text(
      `PET: ${facturacion.pet} - Precio Unitario: ${precioEspecial.precio_pet}`,
      10,
      70
    );

    // Otro contenido del PDF...
    doc.text("Contenido adicional del PDF", 10, 80);

    // Abrir una nueva ventana de impresión
    const iframe = document.createElement("iframe");
    iframe.style.display = "none";
    document.body.appendChild(iframe);

    // Cargar el contenido del PDF en la ventana de impresión
    iframe.src = doc.output("datauristring");
    iframe.onload = () => {
      iframe.contentWindow.print();
      document.body.removeChild(iframe); // Eliminar el iframe después de la impresión
    };
  };

  return (
    <div>
      <button onClick={generatePDF}>Descargar PDF</button>
      <button onClick={printPDF}>Imprimir</button>
    </div>
  );
}
