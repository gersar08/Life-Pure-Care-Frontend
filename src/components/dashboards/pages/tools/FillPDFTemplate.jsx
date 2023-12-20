import React, { useEffect, useState } from 'react';
import { PDFDocument } from 'pdf-lib';
import PropTypes from 'prop-types';
const FillPDFTemplate = ({ history }) => {
  const [isFilling, setIsFilling] = useState(true);

  useEffect(() => {
    const fillPDF = async () => {
      try {
        // Obtener la plantilla PDF
        const templatePath = '../../../../templates/factura_consumidor_final.pdf';
        const templateBytes = await fetch(templatePath).then((res) => res.arrayBuffer());
        const pdfDoc = await PDFDocument.load(templateBytes);

        // Obtener datos de la API (ejemplo)
        const apiData = await fetch('https://rocky-dawn-84773-5951dec09d0b.herokuapp.com/api/registro/daily').then((res) => res.json());

        // Rellenar campos del formulario
        const form = pdfDoc.getForm();
        form.getTextFields().forEach((field) => {
          const fieldName = field.getName();
          if (apiData[fieldName]) {
            field.setText(apiData[fieldName]);
          }
        });

        // Crear un Blob con el PDF llenado
        const filledPdfBytes = await pdfDoc.save();
        const filledPdfBlob = new Blob([filledPdfBytes], { type: 'application/pdf' });

        // Crear una URL para el Blob
        const filledPdfUrl = URL.createObjectURL(filledPdfBlob);

        // Redirigir a la nueva pantalla que mostrará el PDF llenado
        setIsFilling(false);
        history.push(`/filled-pdf-viewer?pdfUrl=${filledPdfUrl}`);
      } catch (error) {
        console.error('Error al llenar el PDF', error);
        setIsFilling(false);
      }
    };

    fillPDF();
  }, [history]);

  return isFilling ? <div>Llenando el PDF...</div> : null;
};
FillPDFTemplate.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
export default FillPDFTemplate;