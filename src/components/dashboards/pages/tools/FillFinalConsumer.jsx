import React from "react";
import { PDFDocument } from "pdf-lib";
import { saveAs } from "file-saver";
import writtenNumber from "written-number";
import { ArrowDownTrayIcon } from "@heroicons/react/20/solid";

export default function FillFinalConsumer({ registro, infoCliente, precios }) {
  async function fillPdf() {
    try {
      const formUrl = "/PDF/consumidor_final.pdf";
      const existingPdfBytes = await fetch(formUrl).then((res) =>
        res.arrayBuffer()
      );
      const pdfDoc = await PDFDocument.load(existingPdfBytes);
      // Date
      const fechaActual = new Date();
      const dia = String(fechaActual.getDate()).padStart(2, "0");
      const mes = String(fechaActual.getMonth() + 1).padStart(2, "0"); // Los meses en JavaScript comienzan desde 0
      const ano = fechaActual.getFullYear();
      const fechaFormateada = `${dia}/${mes}/${ano}`;
      const fechaPdf = `${dia}_${mes}_${ano}`;
      writtenNumber.defaults.lang = "es";

      // Get the form containing all the fields
      const form = pdfDoc.getForm();

      // Get all fields in the PDF by their names
      const fechaField = form.getTextField("Fecha");
      const nameField = form.getTextField("Cliente");
      const addressField = form.getTextField("Direccion");
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
      const totalResField = form.getTextField("totalSum");
      const subTotalField = form.getTextField("sub_total");
      const ventaTotalField = form.getTextField("total");
      const sonField = form.getTextField("SON");

      // Set the values of each field
      fechaField.setText(fechaFormateada);
      nameField.setText(infoCliente.nombre + " " + infoCliente.apellido);
      addressField.setText(infoCliente.direccion);
      nitField.setText(infoCliente.n_documento);
      garrafaField.setText("garrafones de 5 galones");
      fardoField.setText("fardo de agua");
      petField.setText("paquete pet 600 ml");

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
      precioGarrafaField.setText("$" + precioBaseGarrafa);
      precioFardoField.setText("$" + precioBaseFardo);
      precioPetField.setText("$" + precioBasePet);

      // Calcula los totales
      const cantidadGarrafa = Number(cantidadGarrafaField.getText());
      const cantidadFardo = Number(cantidadFardoField.getText());
      const cantidadPet = Number(cantidadPetField.getText());
      const precioGarrafa = Number(precioBaseGarrafa);
      const precioFardo = Number(precioBaseFardo);
      const precioPet = Number(precioBasePet);

      // Calcula los totales
      const totalGarrafa =
        cantidadGarrafa !== 0
          ? (cantidadGarrafa * precioGarrafa).toFixed(2)
          : "";
      const totalFardo =
        cantidadFardo !== 0 ? (cantidadFardo * precioFardo).toFixed(2) : "";
      const totalPet =
        cantidadPet !== 0 ? (cantidadPet * precioPet).toFixed(2) : "";
      const totalRes = (
        Number(totalGarrafa) +
        Number(totalFardo) +
        Number(totalPet)
      ).toFixed(2);

      //  const iva = (Number(totalRes) * 0.13).toFixed(2);
      // const ventaTotal = (Number(totalRes) + Number(iva)).toFixed(2);
      const ventaTotal = Number(totalRes).toFixed(2);

      // Convierte los totales a cadenas de texto
      const totalGarrafaStr = totalGarrafa.toString();
      const totalFardoStr = totalFardo.toString();
      const totalPetStr = totalPet.toString();
      const totalResStr = totalRes.toString();
      //  const ivaStr = iva.toString();
      const ventaTotalStr = ventaTotal.toString();
      const entero = Math.floor(Number(ventaTotal));
      const decimal = Math.round((ventaTotal - entero) * 100);
      const sonFieldText =
        writtenNumber(entero) +
        " dolares con " +
        writtenNumber(decimal) +
        " centavos";

      // Set the values of each fields
      totalGarrafaField.setText("$" + totalGarrafaStr);
      totalFardoField.setText("$" + totalFardoStr);
      totalPetField.setText("$" + totalPetStr);
      totalResField.setText(totalResStr);
      subTotalField.setText(totalResStr);
      ventaTotalField.setText(ventaTotalStr);
      sonField.setText(sonFieldText);

      // Serializa el documento PDF a bytes
      const pdfBytes = await pdfDoc.save();

      // Genera una descarga del documento PDF
      const blob = new Blob([pdfBytes], { type: "application/pdf" });
      saveAs(
        blob,
        `consumidor_final_${infoCliente.nombre}_${infoCliente.apellido}_${fechaPdf}.pdf`
      );
    } catch (error) {
      console.error("Error al procesar el PDF:", error);
    }
  }
  return (
    <button
      onClick={fillPdf}
      className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center"
    >
      <ArrowDownTrayIcon className="w-6 h-6 m-2" />
      <span>Imprimir Consumidor Final</span>
    </button>
  );
}
