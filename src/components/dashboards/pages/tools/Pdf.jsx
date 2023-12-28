import React, {useState} from "react";

function PDF() {

  const [validarInfo ,setValidarInfo] = useState(null);

  const Menu = () => (
    <nav>
      <button onClick={
        setValidarInfo(!setValidarInfo)
      }>
        Revisar Informacion
      </button>
    </nav>
  )
  return (<Menu />);
}

export default PDF;
