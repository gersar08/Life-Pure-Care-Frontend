import React from "react";
import { PDFDocument } from "pdf-lib";
import { saveAs } from "file-saver";

export default function PDFPrinter() {
  async function fillPdf() {
    try {
      // carga el pdf en un buffer
      const formUrl = "/templates/factura_consumidor_final1.pdf";
      const formByte = await fetch(formUrl).then((res) => res.arrayBuffer());
      // Ahora puedes usar pdfBuffer como tus pdfBytes
      console.log(formByte);

      // Crea una instancia de PDFDocument
      const pdfDoc = await PDFDocument.load(formByte);
      console.log(pdfDoc);

      // Date
      const fechaActual = new Date();
      const dia = String(fechaActual.getDate()).padStart(2, "0");
      const mes = String(fechaActual.getMonth() + 1).padStart(2, "0"); // Los meses en JavaScript comienzan desde 0
      const ano = fechaActual.getFullYear();
      const fechaFormateada = `${dia}${mes}${ano}`;

      // Get the form containing all the fields
      const form = pdfDoc.getForm();

      // Get all fields in the PDF by their names
      const fechaField = form.getTextField("FECHA");
      const nameField = form.getTextField("nombre");
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
      const totalGarrafaField = form.getTextField("total_garrafa");
      const totalFardoField = form.getTextField("total_fardo");
      const totalPetField = form.getTextField("total_pet");
      const totalResField = form.getTextField("total_res");
      const ivaField = form.getTextField("IVA");
      const subTotalField = form.getTextField("Sub-Total");
      const ventaTotalField = form.getTextField("VentaTotal");

      fechaField.setText(fechaFormateada);
      nameField.setText("Juan");
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
      totalGarrafaField.setText(cantidadGarrafaField * precioGarrafaField);
      totalFardoField.setText(cantidadFardoField * precioFardoField);
      totalPetField.setText(cantidadPetField * precioPetField);
      totalResField.setText(totalGarrafaField + totalFardoField + totalPetField);
      ivaField.setText(totalResField * 0.13);
      subTotalField.setText(totalResField - ivaField);
      ventaTotalField.setText(totalResField);

      // Serializa el documento PDF a bytes
      const pdfBytes = await pdfDoc.save();

      // Genera una descarga del documento PDF
      const blob = new Blob([pdfBytes], { type: "application/pdf" });
      saveAs(blob, "documento.pdf");
      console.log(pdfBytes);
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
