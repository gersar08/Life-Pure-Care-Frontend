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

      const fechaActual = new Date();
      const dia = String(fechaActual.getDate()).padStart(2, "0");
      const mes = String(fechaActual.getMonth() + 1).padStart(2, "0");
      const ano = fechaActual.getFullYear();
      const fechaFormateada = `${dia}/${mes}/${ano}`;
      const fechaPdf = `${dia}_${mes}_${ano}`;
      writtenNumber.defaults.lang = "es";
      let itemNumber = 1;

      const form = pdfDoc.getForm();

      const fechaField = form.getTextField("Fecha");
      const nameField = form.getTextField("Cliente");
      const addressField = form.getTextField("Direccion");
      const nitField = form.getTextField("n_documento");
      const totalResField = form.getTextField("totalSum");
      const subTotalField = form.getTextField("sub_total");
      const ventaTotalField = form.getTextField("total");
      const sonField = form.getTextField("SON");

      // Set the values of each field
      fechaField.setText(fechaFormateada);
      nameField.setText(infoCliente.nombre + " " + infoCliente.apellido);
      addressField.setText(infoCliente.direccion);
      nitField.setText(infoCliente.n_documento);

      let precioBaseGarrafa = precios.find(
        (precio) => precio.producto_name === "garrafa"
      ).precio_base;
      let precioBaseFardo = precios.find(
        (precio) => precio.producto_name === "fardo"
      ).precio_base;
      let precioBasePet = precios.find(
        (precio) => precio.producto_name === "pet"
      ).precio_base;

      // Calcula los totales
      const cantidadGarrafa = Number(registro.garrafa);
      const cantidadFardo = Number(registro.fardo);
      const cantidadPet = Number(registro.pet);
      const precioGarrafa = Number(precioBaseGarrafa);
      const precioFardo = Number(precioBaseFardo);
      const precioPet = Number(precioBasePet);

      // Calcula los totales
      const totalGarrafa =
        cantidadGarrafa !== 0
          ? (registro.garrafa * precioGarrafa).toFixed(2)
          : "";
      const totalFardo =
        cantidadFardo !== 0 ? (registro.fardo * precioFardo).toFixed(2) : "";
      const totalPet =
        cantidadPet !== 0 ? (registro.pet * precioPet).toFixed(2) : "";

      if (registro.garrafa !== 0) {
        const itemField = form.getTextField(`item${itemNumber}`);
        const cantidadItemField = form.getTextField(
          `cantidad_item${itemNumber}`
        );
        const precioBaseItemField = form.getTextField(
          `precio_base_item${itemNumber}`
        );
        const totalItemField = form.getTextField(`total_item${itemNumber}`);

        itemField.setText("garrafones de 5 galones");
        cantidadItemField.setText(registro.garrafa.toString());

        precioBaseGarrafa = precioBaseGarrafa.toString();
        precioBaseItemField.setText("$" + precioBaseGarrafa);

        const totalGarrafaStr = totalGarrafa.toString();
        totalItemField.setText("$" + totalGarrafaStr);

        itemNumber++;
      }

      if (registro.fardo !== 0) {
        const itemField = form.getTextField(`item${itemNumber}`);
        const cantidadItemField = form.getTextField(
          `cantidad_item${itemNumber}`
        );
        const precioBaseItemField = form.getTextField(
          `precio_base_item${itemNumber}`
        );
        const totalItemField = form.getTextField(`total_item${itemNumber}`);

        itemField.setText("Fardo de agua");
        cantidadItemField.setText(registro.fardo.toString());

        precioBaseFardo = precioBaseFardo.toString();
        precioBaseItemField.setText("$" + precioBaseFardo);

        const totalFardoStr = totalFardo.toString();
        totalItemField.setText("$" + totalFardoStr);

        itemNumber++;
      }
      if (registro.pet !== 0) {
        const itemField = form.getTextField(`item${itemNumber}`);
        const cantidadItemField = form.getTextField(
          `cantidad_item${itemNumber}`
        );
        const precioBaseItemField = form.getTextField(
          `precio_base_item${itemNumber}`
        );
        const totalItemField = form.getTextField(`total_item${itemNumber}`);

        itemField.setText("Paquete pet 600 ml");
        cantidadItemField.setText(registro.pet.toString());

        precioBasePet = precioBasePet.toString();
        precioBaseItemField.setText("$" + precioBasePet);

        const totalPetStr = totalPet.toString();
        totalItemField.setText("$" + totalPetStr);

        itemNumber++;
      }

      const totalRes = (
        Number(totalGarrafa) +
        Number(totalFardo) +
        Number(totalPet)
      ).toFixed(2);

      const ventaTotal = Number(totalRes).toFixed(2);
      const totalResStr = totalRes.toString();
      const ventaTotalStr = ventaTotal.toString();
      const entero = Math.floor(Number(ventaTotal));
      const decimal = Math.round((ventaTotal - entero) * 100);
      const sonFieldText =
        writtenNumber(entero).toUpperCase() +
        " " +
        decimal +
        "/100" +
        " DOLARES ";
      totalResField.setText(totalResStr);
      subTotalField.setText(totalResStr);
      ventaTotalField.setText(ventaTotalStr);
      sonField.setText(sonFieldText);

      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes], { type: "application/pdf" });
      saveAs(
        blob,
        `consumidor_final_${infoCliente.nombre}_${infoCliente.apellido}_${fechaPdf}.pdf`
      );
      itemNumber = 1;
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
