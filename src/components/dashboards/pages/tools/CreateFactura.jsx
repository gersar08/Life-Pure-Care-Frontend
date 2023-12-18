import React, { useState } from 'react';
import { PDFDocument } from 'pdf-lib';


const CreateFactura = () => {
  const [pdfBytes, setPdfBytes] = useState(null);

  const handleGeneratePdf = async () => {
    // Cargar la plantilla PDF existente (reemplaza 'ruta-a-tu-plantilla.pdf' con la ruta correcta)
    const existingPdfBytes = await fetch('ruta-a-tu-plantilla.pdf').then((res) => res.arrayBuffer());
    const pdfDoc = await PDFDocument.load(existingPdfBytes);

    // Obtener la primera página del PDF
    const page = pdfDoc.getPages()[0];

    // Agregar texto a la ubicación deseada en la página
    page.drawText('Nombre: Juan Pérez', { x: 50, y: 500 });
    page.drawText('Edad: 25', { x: 50, y: 480 });
    // ... agregar más campos y datos según sea necesario

    // Guardar el nuevo PDF
    const modifiedPdfBytes = await pdfDoc.save();
    setPdfBytes(modifiedPdfBytes);
  };

  return (
    <div>
      <button onClick={handleGeneratePdf}>Generar PDF</button>
      {pdfBytes && (
        <a
          href={`data:application/pdf;base64,${Buffer.from(pdfBytes).toString('base64')}`}
          download="documento-modificado.pdf"
        >
          Descargar PDF Modificado
        </a>
      )}
    </div>
  );
};

export default CreateFactura;
