import React, { useState } from "react";
import FillFiscalCredit from "./FillFiscalCredit";
import FillFinalConsumer from "./FillFinalConsumer";
export default function PDFSelector() {
  const [componente, setComponente] = useState(null);

  const handleClick1 = () => {
    setComponente(<FillFiscalCredit />);
  };

  const handleClick2 = () => {
    setComponente(<FillFinalConsumer />);
  };

  return (
    <div>
      <button
        onClick={handleClick1}
        class="m-5 p-7 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
      >
        Credito Fiscal
      </button>
      <button
        onClick={handleClick2}
        class=" m-5 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
      >
        Consumidor Final
      </button>
      <br />
      <div className="flex justify-center items-center">{componente}</div>
    </div>
  );
}
