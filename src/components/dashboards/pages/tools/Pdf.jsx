import React from "react";
import { Viewer, SpecialZoomLevel } from "@react-pdf-viewer/core";

export default function Pdf() {
  return (
    <div>
      <Viewer
        fileUrl="../../../../templates/factura_consumidor_final.pdf"
        defaultScale={SpecialZoomLevel.PageFit}
      />
    </div>
  );
}
