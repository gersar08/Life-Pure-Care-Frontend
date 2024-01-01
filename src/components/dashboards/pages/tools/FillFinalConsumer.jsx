import React from "react";
import { PDFDocument } from "pdf-lib";
import { saveAs } from "file-saver";

export default function FillFinalConsumer({ registro, infoCliente, precios}) {
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
      const fechaFormateada = `${dia}/${mes}/${ano}`;
      const fechaPdf = `${dia}_${mes}_${ano}`;


      // Get the form containing all the fields
      const form = pdfDoc.getForm();

      // Get all fields in the PDF by their names
      const fechaField = form.getTextField("FECHA");
      const nameField = form.getTextField("nombre");
      const addressField = form.getTextField("direccion");
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

      // Set the values of each field
      fechaField.setText(fechaFormateada);
      nameField.setText(infoCliente.nombre + " " + infoCliente.apellido);
      addressField.setText(infoCliente.direccion);
      nitField.setText(infoCliente.n_documento);
      garrafaField.setText("Garrafa");
      fardoField.setText("Fardo");
      petField.setText("Pet");

      // Set the values of each field
      cantidadGarrafaField.setText(registro.garrafa.toString());
      cantidadFardoField.setText(registro.fardo.toString());
      cantidadPetField.setText(registro.pet.toString());

      // Set the values of each field
      let precioBaseGarrafa = precios.find(
        (precio) => precio.producto_name === "garrafa"
      ).precio_base;
      let precioBaseFardo = precios.find(
        (precio) => precio.producto_name === "fardo"
      ).precio_base;
      let precioBasePet = precios.find(
        (precio) => precio.producto_name === "pet"
      ).precio_base;

      // Convert the prices to strings
      precioBaseGarrafa = precioBaseGarrafa.toString();
      precioBaseFardo = precioBaseFardo.toString();
      precioBasePet = precioBasePet.toString();

      // Set the values of each field
      precioGarrafaField.setText(precioBaseGarrafa);
      precioFardoField.setText(precioBaseFardo);
      precioPetField.setText(precioBasePet);

      // Calcula los totales
      const cantidadGarrafa = Number(cantidadGarrafaField.getText());
      const cantidadFardo = Number(cantidadFardoField.getText());
      const cantidadPet = Number(cantidadPetField.getText());
      const precioGarrafa = Number(precioGarrafaField.getText());
      const precioFardo = Number(precioFardoField.getText());
      const precioPet = Number(precioPetField.getText());

      // Calcula los totales
      const totalGarrafa = (Number(cantidadGarrafa) * Number(precioGarrafa)).toFixed(2);
      const totalFardo = (Number(cantidadFardo) * Number(precioFardo)).toFixed(2);
      const totalPet = (Number(cantidadPet) * Number(precioPet)).toFixed(2);
      const totalRes = (Number(totalGarrafa) + Number(totalFardo) + Number(totalPet)).toFixed(2);

      // Convierte los totales a cadenas de texto
      const totalGarrafaStr = totalGarrafa.toString();
      const totalFardoStr = totalFardo.toString();
      const totalPetStr = totalPet.toString();
      const totalResStr = totalRes.toString();

      // Set the values of each fields
      totalGarrafaField.setText(`$ ${totalGarrafaStr}`);
      totalFardoField.setText(`$ ${totalFardoStr}`);
      totalPetField.setText(`$ ${totalPetStr}`);
      totalResField.setText(`$ ${totalResStr}`);
      // Serializa el documento PDF a bytes
      const pdfBytes = await pdfDoc.save();

      // Genera una descarga del documento PDF
      const blob = new Blob([pdfBytes], { type: "application/pdf" });
      saveAs(blob, `consumidor_final_${infoCliente.nombre}_${infoCliente.apellido}_${fechaPdf}.pdf`);
      console.log(pdfBytes);
    } catch (error) {
      console.error("Error al procesar el PDF:", error);
      console.error(error.stack);
    }
  }
  return (
    <button
      onClick={fillPdf}
      class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center"
    >
      <svg
        class="fill-current w-4 h-4 mr-2"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
      >
        <path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" />
      </svg>
      <span>Imprimir Consumidor Final</span>
    </button>
  );
}
