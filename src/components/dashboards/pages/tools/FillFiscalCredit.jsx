import React, { useEffect, useState } from "react";
import { saveAs } from "file-saver";
import { PDFDocument } from "pdf-lib";
import { toast, ToastContainer } from "react-toastify";
import { ArrowDownTrayIcon } from "@heroicons/react/20/solid";
import writtenNumber from "written-number";

export default function FillFiscalCredit({ registro, infoCliente, precios }) {
  const [pdfBytes, setPdfBytes] = useState(null);
  // Date
  const fechaActual = new Date();
  const dia = String(fechaActual.getDate()).padStart(2, "0");
  const mes = String(fechaActual.getMonth() + 1).padStart(2, "0");
  const ano = fechaActual.getFullYear();
  const fechaFormateada = `${dia}/${mes}/${ano}`;
  const fechaPdf = `${dia}_${mes}_${ano}`;
  writtenNumber.defaults.lang = "es";
  let itemNumber = 1;

  useEffect(() => {
    const formUrl = "/PDF/credito_fiscal.pdf";
    const formatPdf = async () => {
      try {
        // carga el pdf en un buffer
        const response = await fetch(formUrl);
        if (!response.ok) {
          toast.error("Error al cargar el archivo PDF.");
          return;
        }
        const formByte = await response.arrayBuffer();
        const headerBytes = new Uint8Array(formByte.slice(0, 1024)); // Lee los primeros 1024 bytes
        const headerString = String.fromCharCode.apply(null, headerBytes);
        if (!headerString.includes("%PDF-")) {
          toast.error("El archivo no tiene un encabezado PDF válido.");
          return;
        }
        // Crea una instancia de PDFDocument
        const pdfDoc = await PDFDocument.load(formByte); // Corrección aquí

        // Get the form containing all the fields
        const form = pdfDoc.getForm();

        const fechaField = form.getTextField("Fecha");
        const nameField = form.getTextField("nombre");
        const addressField = form.getTextField("direccion");
        const giroField = form.getTextField("giro");
        const municipioField = form.getTextField("municipio");
        const departamentoField = form.getTextField("departamento");
        const ivaField = form.getTextField("IVA");
        const registroField = form.getTextField("registro_num");

        const nitField = form.getTextField("nit");
        const totalResField = form.getTextField("total_res");
        const subTotalField = form.getTextField("Sub-Total");
        const ventaTotalField = form.getTextField("VentaTotal");
        const sonField = form.getTextField("SON");

        // Set the values of each field
        fechaField.setText(fechaFormateada);
        nameField.setText(infoCliente.nombre + " " + infoCliente.apellido);
        addressField.setText(infoCliente.direccion);
        nitField.setText(infoCliente.n_documento);
        registroField.setText(infoCliente.n_documento);
        giroField.setText(infoCliente.giro);
        municipioField.setText(infoCliente.municipio);
        departamentoField.setText(infoCliente.departamento);

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
        const precioGarrafa = Number(
          (precioBaseGarrafa - (precioBaseGarrafa * 0.13) / 1.13).toFixed(6)
        );
        const precioFardo = Number(
          (precioBaseFardo - (precioBaseFardo * 0.13) / 1.13).toFixed(6)
        );
        const precioPet = Number(
          (precioBasePet - (precioBasePet * 0.13) / 1.13).toFixed(6)
        );

        // Calcula los totales
        const totalGarrafa =
          cantidadGarrafa !== 0
            ? parseFloat((registro.garrafa * precioGarrafa)).toFixed(2)
            : "";
        const totalFardo =
          cantidadFardo !== 0 ? parseFloat((registro.fardo * precioFardo)).toFixed(2) : "";
        const totalPet =
          cantidadPet !== 0 ? parseFloat((registro.pet * precioPet).toFixed(2)) : "";

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

        const iva = (Number(totalRes) * 0.13).toFixed(2);
        const subTotal = (Number(totalRes) + Number(iva)).toFixed(2);
        const ventaTotal = (Number(totalRes) + Number(iva)).toFixed(2);

        const totalResStr = totalRes.toString();
        const ivaStr = iva.toString();
        const subTotalStr = subTotal.toString();
        const ventaTotalStr = ventaTotal.toString();
        const entero = Math.floor(Number(ventaTotal));
        const decimal = Math.round((ventaTotal - entero) * 100);
        const sonFieldText =
          writtenNumber(entero).toUpperCase() +
          " " +
          decimal +
          "/100" +
          " DOLARES ";
        // Set the values of each fields
        totalResField.setText(totalResStr);
        subTotalField.setText(subTotalStr);
        ivaField.setText(ivaStr);
        ventaTotalField.setText(ventaTotalStr);
        sonField.setText(sonFieldText);
        itemNumber = 1;

        // Serializa el documento PDF a bytes
        const pdfBytes = await pdfDoc.save();
        setPdfBytes(pdfBytes);
      } catch (error) {
        toast.error("Error al procesar el PDF:", error);
        console.error(error.stack);
      }
    };
    formatPdf();
  }, [registro, infoCliente, precios]);

  async function fillPdf() {
    if (pdfBytes) {
      // Genera una descarga del documento PDF
      const blob = new Blob([pdfBytes], { type: "application/pdf" });
      saveAs(
        blob,
        `credito_fiscal_${infoCliente.nombre}_${infoCliente.apellido}_${fechaPdf}.pdf`
      );
    } else {
      toast.error("Error al procesar el PDF");
    }
  }
  return (
    <div>
      <ToastContainer />
      <button
        onClick={fillPdf}
        className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center"
      >
        <ArrowDownTrayIcon className="w-6 h-6 m-2" />
        <span>Imprimir Credito Fiscal</span>
      </button>
    </div>
  );
}
