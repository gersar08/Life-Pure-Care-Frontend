import React from "react";
import { saveAs } from "file-saver";
import { ArrowDownTrayIcon } from "@heroicons/react/20/solid";
import PSPDFKit from "pspdfkit";

export default function FillFinalConsumer({ registro, infoCliente, precios }) {
  async function fillPdf() {
    try {
      // Carga el documento PDF con PSPDFKit
      const formUrl = "./PDF/credito_fiscal2.pdf";
      const instance = await PSPDFKit.load({
        container: "#pdf-container",
        document: formUrl,
      });

      // Obtiene el formulario del documento PDF
      const form = await instance.getForm();

      // Setea los valores en los campos del formulario
      form.getField("FECHA").setValue(getFormattedDate());
      form.getField("nombre").setValue(infoCliente.nombre + " " + infoCliente.apellido);
      form.getField("direccion").setValue(infoCliente.direccion);
      form.getField("nit").setValue(infoCliente.n_documento);
      form.getField("garrafa").setValue("Garrafa");
      form.getField("fardo").setValue("Fardo");
      form.getField("pet").setValue("Pet");

      // Setea los valores en los campos del formulario
      form.getField("cantidad_garrafa").setValue(registro.garrafa.toString());
      form.getField("cantidad_fardo").setValue(registro.fardo.toString());
      form.getField("cantidad_pet").setValue(registro.pet.toString());

      // Setea los valores en los campos del formulario
      let precioBaseGarrafa = getPrecioBase("garrafa", precios);
      let precioBaseFardo = getPrecioBase("fardo", precios);
      let precioBasePet = getPrecioBase("pet", precios);

      form.getField("precio_base_garrafa").setValue(precioBaseGarrafa.toString());
      form.getField("precio_base_fardo").setValue(precioBaseFardo.toString());
      form.getField("precio_base_pet").setValue(precioBasePet.toString());

      // Calcula los totales
      const totalGarrafa = calcularTotal(registro.garrafa, precioBaseGarrafa);
      const totalFardo = calcularTotal(registro.fardo, precioBaseFardo);
      const totalPet = calcularTotal(registro.pet, precioBasePet);
      const totalRes = (totalGarrafa + totalFardo + totalPet).toFixed(2);

      // Setea los valores en los campos del formulario
      form.getField("total_garrafa").setValue(totalGarrafa.toString());
      form.getField("total_fardo").setValue(totalFardo.toString());
      form.getField("total_pet").setValue(totalPet.toString());
      form.getField("totalSum").setValue(totalRes.toString());
      form.getField("total").setValue(totalRes.toString());

      // Guarda el documento modificado y descárgalo
      const modifiedBytes = await instance.exportPDF();
      const blob = new Blob([modifiedBytes], { type: "application/pdf" });
      saveAs(blob, getFileName(infoCliente, "consumidor_final"));
    } catch (error) {
      console.error("Error al procesar el PDF:", error);
    }
  }

  function getFormattedDate() {
    const fechaActual = new Date();
    const dia = String(fechaActual.getDate()).padStart(2, "0");
    const mes = String(fechaActual.getMonth() + 1).padStart(2, "0");
    const ano = fechaActual.getFullYear();
    return `${dia}/${mes}/${ano}`;
  }

  function getPrecioBase(producto, precios) {
    const precioBase = precios.find((precio) => precio.producto_name === producto)?.precio_base || 0;
    return precioBase.toString();
  }

  function calcularTotal(cantidad, precioBase) {
    return (Number(cantidad) * Number(precioBase)).toFixed(2);
  }

  function getFileName(infoCliente, tipo) {
    const fechaActual = getFormattedDate().replace(/\//g, '_');
    return `${tipo}_${infoCliente.nombre}_${infoCliente.apellido}_${fechaActual}.pdf`;
  }

  return (
    <div>
      <div id="pdf-container" style={{ display: 'none' }}></div>
      <button
        onClick={fillPdf}
        className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center"
      >
        <ArrowDownTrayIcon className="w-6 h-6 m-2" />
        <span>Imprimir Consumidor Final</span>
      </button>
    </div>
  );
}
