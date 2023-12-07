import React from 'react';
import jsPDF from 'jspdf';

export default function Facturation() {
    const generatePDF = () => {
        const doc = new jsPDF();
        doc.text('Contenido del PDF', 10, 10);
        doc.save('facturacion.pdf');
    };

    return (
        <div>
            <button onClick={generatePDF}>Descargar PDF</button>
            <button onClick={() => window.print()}>Imprimir</button>
        </div>
    );
}

