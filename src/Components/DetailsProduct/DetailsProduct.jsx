import { useParams } from "react-router-dom"
import "./DetailsProduct.css"
import { useEffect, useState } from "react";

const DetailsProduct = () => {
  const {id} = useParams()
  const [producto, setProducto] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducto = async () => {
      try {
        const response = await fetch(`https://api-ten-jet.vercel.app/products/${id}`);
        if (!response.ok) {
          throw new Error("Error al cargar los productos");
        }
        const data = await response.json();
        setProducto(data); // Guarda el producto en el estado

      } catch (err) {
        setError(err.message);  // Maneja errores
      }
    }
    fetchProducto();
  }, [id]);

  if (error) {
    return <h2 className="error-message">{error}</h2>
  }

  return (
    <div className="product-details">
      {
        producto ? (
          <>
            <img src={producto.image} alt={producto.nombre} className="image-small" />
            <img src={producto.image} alt={producto.nombre} />
            <div className="product-infos">
              <h1>{producto.nombre}</h1>
              <p className="price">{producto.precio}</p>
              <p className="description">{producto.descripcion}</p>
              <div className="size-options">
                <button>S</button>
                <button>M</button>
                <button>L</button>
                <button>XL</button>
              </div>
              <button className="add-to-cart">Añadir al carrito</button>
            </div>
            <p className="note">
              Producto 100% original. El pago contra reembolso está
              disponible ára este producto.
              Política de devolución y cambio fácil dentro de los 7 días.
            </p>
          </>
        ) : (
            <p>Cargando producto...</p>
        )
      }
    </div>
  )
}

export default DetailsProduct