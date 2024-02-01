import React, { useEffect, useState } from "react";
import { PDFDocument } from "pdf-lib";
import { saveAs } from "file-saver";
import { toast, ToastContainer } from "react-toastify";
import { ArrowDownTrayIcon } from "@heroicons/react/20/solid";
/*import { Worker, Viewer } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
*/
export default function FillFiscalCredit({ registro, infoCliente, precios }) {
  const [pdfBytes, setPdfBytes] = useState(null);
  // Date
  const fechaActual = new Date();
  const dia = String(fechaActual.getDate()).padStart(2, "0");
  const mes = String(fechaActual.getMonth() + 1).padStart(2, "0");
  const ano = fechaActual.getFullYear();
  const fechaFormateada = `${dia}/${mes}/${ano}`;
  const fechaPdf = `${dia}_${mes}_${ano}`;
  //URL PDF
 // const [pdfUrl, setPdfUrl] = useState(null);

  useEffect(() => {
    const formatPdf = async () => {
      try {
        // carga el pdf en un buffer
        const formUrl = "/templates/factura_credito_fiscal.pdf";
        const formByte = await fetch(formUrl).then((res) => res.arrayBuffer());

        // Crea una instancia de PDFDocument
        const pdfDoc = await PDFDocument.load(formByte);

        // Get the form containing all the fields
        const form = pdfDoc.getForm();

        // Get all fields in the PDF by their names
        const fechaField = form.getTextField("Fecha");
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
        const totalResField = form.getTextField("totalSum");

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
        const totalGarrafa = (
          Number(cantidadGarrafa) * Number(precioGarrafa)
        ).toFixed(2);
        const totalFardo = (
          Number(cantidadFardo) * Number(precioFardo)
        ).toFixed(2);
        const totalPet = (Number(cantidadPet) * Number(precioPet)).toFixed(2);
        const totalRes = (
          Number(totalGarrafa) +
          Number(totalFardo) +
          Number(totalPet)
        ).toFixed(2);

        // Convierte los totales a cadenas de texto
        const totalGarrafaStr = totalGarrafa.toString();
        const totalFardoStr = totalFardo.toString();
        const totalPetStr = totalPet.toString();
        const totalResStr = totalRes.toString();

        // Set the values of each fields
        totalGarrafaField.setText(totalGarrafaStr);
        totalFardoField.setText(totalFardoStr);
        totalPetField.setText(totalPetStr);
        totalResField.setText(totalResStr);

        // Serializa el documento PDF a bytes
        const pdfBytes = await pdfDoc.save();
        setPdfBytes(pdfBytes);
        // Crea una URL de objeto a partir de los bytes del PDF
        const blob = new Blob([pdfBytes], { type: "application/pdf" });
        const url = URL.createObjectURL(blob);
        setPdfUrl(url);
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
      {/*
        <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
           {pdfUrl && <Viewer fileUrl={pdfUrl} />}
       </Worker>
        */}
      <ToastContainer />
      <button
        onClick={fillPdf}
        class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center"
      >
        <ArrowDownTrayIcon class="w-6 h-6 m-2" />
        <span>Imprimir Credito Fiscal</span>
      </button>
    </div>
  );
}
