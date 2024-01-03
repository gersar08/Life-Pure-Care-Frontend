import React, { useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

const Notification = () => {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://rocky-dawn-84773-5951dec09d0b.herokuapp.com/api/inventario"
        );
        const { data } = response;
            console.log(data);
        const lowStockProducts = data.filter(
          (product) =>
            (product.name === "garrafa" ||
              product.name === "fardo" ||
              product.name === "pet") &&
            product.quantity < 20
        );

        if (lowStockProducts.length > 0) {
          toast.error("¡Algunos productos están bajo de stock!");
        }
      } catch (error) {
        console.error("Error fetching inventory data:", error);
      }
    };

    fetchData();
  }, []);

  return <div>Notification Component</div>;
};

export default Notification;
