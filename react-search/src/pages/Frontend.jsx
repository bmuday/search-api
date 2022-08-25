import { useState, useEffect } from "react";
import Products from "../components/Products";

const Frontend = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [filters, setFilters] = useState({
    s: "",
    sort: "",
    page: 1,
  });
  const perPage = 9;
  const [lastPage, setLastPage] = useState(0);

  const getProducts = async () => {
    const res = await fetch("http://localhost:8000/api/products/frontend");
    const data = await res.json();

    setAllProducts(data);
    setFilteredProducts(data.slice(0, filters.page * perPage));
    setLastPage(Math.ceil(data.length / perPage));
  };

  useEffect(() => {
    getProducts();
  }, []);

  useEffect(() => {
    // Searching
    let products = allProducts.filter(
      (p) =>
        p.title.toLowerCase().includes(filters.s.toLowerCase()) ||
        p.description.toLowerCase().includes(filters.s.toLowerCase())
    );

    // Sorting
    if (filters.sort === "asc" || filters.sort === "desc") {
      products.sort((a, b) => {
        const diff = a.price - b.price;

        if (diff === 0) return 0;

        const sign = Math.abs(diff) / diff;

        return filters.sort === "asc" ? sign : -sign;
      });
    }

    setLastPage(Math.ceil(products.length / perPage));
    setFilteredProducts(products.slice(0, filters.page * perPage));
  }, [filters]);
  //   console.log(filteredProducts);
  return (
    <Products
      products={filteredProducts}
      filters={filters}
      setFilters={setFilters}
    />
  );
};

export default Frontend;
