import React from "react";
import { PDFDocument } from "pdf-lib";

export default function PDFPrinter() {
  async function fillPdf() {
    try {
      // Carga el archivo PDF
      const pdfBuffer = await fetch(
        "https://acrobat.adobe.com/id/urn:aaid:sc:VA6C2:c787379c-0338-4207-9ced-50f24ac4c22c"
      ) // Asegúrate de que esta ruta sea correcta
        .then((response) => response.arrayBuffer())
        .catch((error) => console.error("Error al obtener el PDF:", error));

      // Ahora puedes usar pdfBuffer como tus pdfBytes
      console.log(pdfBuffer);

      // Crea una instancia de PDFDocument
      const pdfDoc = await PDFDocument.load(pdfBuffer);

      // Date
      const form = pdfDoc.getForm();
      const fechaActual = new Date();
      const dia = String(fechaActual.getDate()).padStart(2, "0");
      const mes = String(fechaActual.getMonth() + 1).padStart(2, "0"); // Los meses en JavaScript comienzan desde 0
      const ano = fechaActual.getFullYear();

      const fechaFormateada = `${dia}${mes}${ano}`;

      // Get all fields in the PDF by their names
      const fechaField = form.getTextField("FECHA");
      const nameField = form.getTextField("nombre");
      const lastNameField = form.getTextField("apellido");
      const addressField = form.getTextField("direccion");
      const municipalityField = form.getTextField("MUNICIPIO");
      const departmentField = form.getTextField("DEPTO");
      const nitField = form.getTextField("n_documento");
      const garrafaField = form.getTextField("garrafa");
      const fardoField = form.getTextField("fardo");
      const petField = form.getTextField("pet");
      const cantidadGarrafaField = form.getTextField("cantidad_garrafa");
      const cantidadFardoField = form.getTextField("cantidad_fardo");
      const cantidadPetField = form.getTextField("cantidad_pet");
      const precioGarrafaField = form.getTextField("precio_base_garrafa");
      const precioFardoField = form.getTextField("precio_base_fardo");
      const precioPetField = form.getTextField("precio_base_pet");
      const sonField = form.getTextField("SON");

      fechaField.setText(fechaFormateada);
      nameField.setText("Juan");
      lastNameField.setText("Perez");
      addressField.setText("Calle 1");
      municipalityField.setText("Municipio 1");
      departmentField.setText("Departamento 1");
      nitField.setText("123456789");
      garrafaField.setText("Garrafa");
      fardoField.setText("Fardo");
      petField.setText("Pet");
      cantidadGarrafaField.setText("1");
      cantidadFardoField.setText("2");
      cantidadPetField.setText("3");
      precioGarrafaField.setText("100");
      precioFardoField.setText("200");
      precioPetField.setText("300");
      sonField.setText("Mil cuatrocientos");

      // Serializa el PDFDocument a bytes (un Uint8Array)
      const pdfBytes = await pdfDoc.save();

      // Crea un blob a partir de los bytes del PDF
      console.log(pdfBytes);
      const blob = new Blob([pdfBytes], { type: "application/pdf" });
      // Crea una URL de objeto a partir del blob
      const url = URL.createObjectURL(blob);

      // Crea un enlace (link) para permitir la descarga del PDF
      const downloadLink = document.createElement("a");
      downloadLink.href = url;
      downloadLink.download = "factura_llenada.pdf";
      downloadLink.click();

      // Limpia la URL del objeto creado
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error al procesar el PDF:", error);
      console.error(error.stack);
    }
  }

  return (
    <div>
      <button onClick={fillPdf}>Fill PDF</button>
    </div>
  );
}
