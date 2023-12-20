import React from 'react';

const FilledPDFViewer = ({ location }) => {
  const pdfUrl = new URLSearchParams(location.search).get('pdfUrl');

  return (
    <div>
      <embed src={pdfUrl} type="application/pdf" width="100%" height="600px" />
    </div>
  );
};

export default FilledPDFViewer;