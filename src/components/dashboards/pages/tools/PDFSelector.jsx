import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import FillFiscalCredit from "./FillFiscalCredit";
import FillFinalConsumer from "./FillFinalConsumer";
export default function PDFSelector() {
  const location = useLocation();
  const { selectedOption } = location.state || {};
  const [componente, setComponente] = useState(null);
  const [registro, setRegistro] = useState(null);
  const [infoCliente, setInfoCliente] = useState(null);
  const [precios, setPrecios] = useState(null);
  const token = localStorage.getItem("token");

  const handleClick1 = () => {
    setComponente(
      <FillFiscalCredit
        registro={registro}
        infoCliente={infoCliente}
        precios={precios}
      />
    );
  };

  const handleClick2 = () => {
    setComponente(
      <FillFinalConsumer
        registro={registro}
        infoCliente={infoCliente}
        precios={precios}
      />
    );
  };

  const instance = axios.create({
    baseURL: "https://rocky-dawn-84773-5951dec09d0b.herokuapp.com/api",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  useEffect(() => {
    instance
      .get(`/registro/daily/search/${selectedOption}`)
      .then((response) => {
        setRegistro(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    instance
      .get(`/clientes/search/unique_id/${selectedOption}`)
      .then((response) => {
        setInfoCliente(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    instance
      .get(`/productos`)
      .then((response) => {
        setPrecios(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div>
      <button
        onClick={handleClick1}
        className="m-5 p-7 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
      >
        Credito Fiscal
      </button>
      <button
        onClick={handleClick2}
        className=" m-5 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
      >
        Consumidor Final
      </button>
      <br />
      <div className="flex justify-center items-center">{componente}</div>
    </div>
  );
}
