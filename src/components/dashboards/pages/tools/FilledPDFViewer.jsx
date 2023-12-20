import React from 'react';
import PropTypes from 'prop-types';

const FilledPDFViewer = ({ location }) => {
  const pdfUrl = new URLSearchParams(location.search).get('pdfUrl');

  return (
    <div>
      <embed src={pdfUrl} type="application/pdf" width="100%" height="600px" />
    </div>
  );
};

FilledPDFViewer.propTypes = {
  location: PropTypes.shape({
    search: PropTypes.string,
  }),
};

export default FilledPDFViewer;