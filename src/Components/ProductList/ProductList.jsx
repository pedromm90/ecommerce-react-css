import { useEffect, useState } from "react";
import "./ProductList.css"
import { useNavigate } from "react-router-dom";

const ProductList = () => {

  const [productos, setProductos] = useState([]);
  const [error, setError] = useState(null);
  const [orden, setOrden] = useState("Relevante");
  const [filtros, setFiltros] = useState({categorias: [], tipos: []});
  const navigate = useNavigate();

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

  const toggleFiltros = (tipoFiltro, valor) => {
    setFiltros((prev) => ({
      ...prev,
      [tipoFiltro]: prev[tipoFiltro].includes(valor)
      ? prev[tipoFiltro].filter((item) => item !== valor)
      : [...prev[tipoFiltro], valor],
    }))
  }

  const productosFiltrados = productos.filter((producto) => {
    const matchCategoria =
    filtros.categorias.length === 0 || filtros.categorias.includes(producto.categoria);

    const matchTipo =
    filtros.tipos.length === 0 || filtros.tipos.includes(producto.tipo);

    return matchCategoria && matchTipo;
  })

  const handleOrdenChange = (e) => {
    setOrden(e.target.value)
  }

  const productosOrdenados = [...productosFiltrados].sort((a,b) => {
    if (orden === "Precio: Menor a Mayor") {
      return a.precio - b.precio
    } if (orden === "Precio: Mayor a Menor") {
      return b.precio - a.precio
    }
    return 0;
  })

  const handleImageClick = (id) => {
    navigate(`/producto/${id}`);
  }

  return (
    <section className="main-content">
      <aside className="filters">
        <h2>Filtros</h2>
        <div className="filters-category">
          <div className="filter-category">
            <h3>Categorías</h3>
            <label>
              <input type="checkbox"
                onChange={() => toggleFiltros ("categorias", "Hombres")}
              />
              <span>Hombres</span>
            </label>
            <label>
              <input type="checkbox" 
                onChange={() => toggleFiltros ("categorias", "Mujeres")}
              />
              <span>Mujeres</span>
            </label>
            <label>
              <input type="checkbox" 
                onChange={() => toggleFiltros ("categorias", "Niños")}
              />
              <span>Niños</span>
            </label>
          </div>

          <div className="filter-category">
            <h3>Tipos</h3>
            <label>
              <input type="checkbox" 
                onChange={() => toggleFiltros ("tipos", "Prendas de abrigo")}
              />
              <span>Prendas de abrigo</span>
            </label>
            <label>
              <input type="checkbox" 
                onChange={() => toggleFiltros ("tipos", "Ropa interior")}
              />
              <span>Ropa interior</span>
            </label>
            <label>
              <input type="checkbox" 
                onChange={() => toggleFiltros ("tipos", "Calzado")}
              />
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
          ) : productosFiltrados.length > 0 ? (
            productosOrdenados.map((producto) => (
              <div className="product-card" key={producto.id}>
                <img
                  src={producto.image}
                  alt={producto.image}
                  className="product-image"
                  onClick={() => handleImageClick(producto.id)}
                />

                <h3>{producto.nombre}</h3>
                <p>{producto.precio}</p>
              </div>
            ))
          ) : (
              <p className="no-results">
                No hay productos que coincidan con los filtros seleccionados
              </p>
          )}
        </div>
      </main>
    </section>
  );

}


export default ProductList;
