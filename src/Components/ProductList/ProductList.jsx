import { useEffect, useState } from "react";
import "./ProductList.css"

const ProductList = () => {

  const [productos, setProductos] = useState([]);
  const [error, setError] = useState(null);
  const [orden, setOrden] = useState("Relevante");

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const response = await fetch("https://api-ten-jet.vercel.app/products");
        if (!response.ok) {
          throw new Error("Error al cargar los productos");
        }
        const data = await response.json();
        setProductos(data)

      } catch (err) {
        setError(err.message)
      }
    }
    fetchProductos();
  }, []);

  const handleOrdenChange = (e) => {
    setOrden(e.target.value)
  }

  const productosOrdenados = [...productos].sort((a,b) => {
    if (orden === "Precio: Menor a Mayor") {
      return a.precio - b.precio
    } if (orden === "Precio: Mayor a Menor") {
      return b.precio - a.precio
    }
    return 0;
  })

  return (
    <section className="main-content">
      <aside className="filters">
        <h2>Filtros</h2>
        <div className="filters-category">
          <div className="filter-category">
            <h3>Categorías</h3>
            <label>
              <input type="checkbox" />
              <span>Hombres</span>
            </label>
            <label>
              <input type="checkbox" />
              <span>Mujeres</span>
            </label>
            <label>
              <input type="checkbox" />
              <span>Niños</span>
            </label>
          </div>

          <div className="filter-category">
            <h3>Tipos</h3>
            <label>
              <input type="checkbox" />
              <span>Prendas de abrigo</span>
            </label>
            <label>
              <input type="checkbox" />
              <span>Ropa interior</span>
            </label>
            <label>
              <input type="checkbox" />
              <span>Calzado</span>
            </label>
          </div>
        </div>
      </aside>
      <main className="collections">
        <div className="options">
          <h2>TODAS LAS COLECCIONES</h2>
          <div className="sort-options">
            <label>
              Ordenar por:
              <select onChange={ handleOrdenChange } value={orden}>
                <option>Relevante</option>
                <option>Precio: Menor a Mayor</option>
                <option>Precio: Mayor a Menor</option>
              </select>
            </label>
          </div>
        </div>

        <div className="products">
          {error ? (
            <p className="error-message">{error}</p>
          ) : (
            productosOrdenados.map((producto) => (
              <div className="product-card" key={producto.id}>
                <img
                  src={producto.image}
                  alt={producto.image}
                  className="product-image"
                />

                <h3>{producto.nombre}</h3>
                <p>{producto.precio}</p>
              </div>
            ))
          )}
        </div>
      </main>
    </section>
  );

}


export default ProductList;
