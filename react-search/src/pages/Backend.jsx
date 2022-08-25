import { useState, useEffect } from "react";
import Products from "../components/Products";

const Backend = () => {
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState({
    s: "",
    sort: "",
    page: 1,
  });
  const [lastPage, setLastPage] = useState(0);

  const getProducts = async () => {
    const arr = [];

    // Searching
    if (filters.s) {
      arr.push(`s=${filters.s}`);
    }

    // Sorting
    if (filters.sort) {
      arr.push(`sort=${filters.sort}`);
    }

    // Lazy-loading
    if (filters.page) {
      arr.push(`page=${filters.page}`);
    }

    const res = await fetch(
      `http://localhost:8000/api/products/backend?${arr.join("&")}`
    );
    const { data, last_page } = await res.json();

    setProducts(filters.page === 1 ? data : [...products, ...data]);
    setLastPage(last_page);
  };

  useEffect(() => {
    getProducts();
  }, [filters]);
  //   console.log(products);
  return (
    <Products
      products={products}
      filters={filters}
      setFilters={setFilters}
      lastPage={lastPage}
    />
  );
};

export default Backend;
