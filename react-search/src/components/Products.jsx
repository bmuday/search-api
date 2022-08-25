import React from "react";

const Products = ({ products, filters, setFilters, lastPage }) => {
  const search = (s) => {
    setFilters({
      ...filters,
      s,
      page: 1,
    });
  };

  const sort = (sort) => {
    setFilters({
      ...filters,
      sort,
      page: 1,
    });
  };

  const load = () => {
    setFilters({ ...filters, page: filters.page + 1 });
  };

  let button;
  if (filters.page !== lastPage) {
    button = (
      <div className="d-flex justify-content-center mt-4">
        <button className="btn btn-primary" onClick={load}>
          Load More
        </button>
      </div>
    );
  }
  return (
    <>
      <div className="col-md-12 mb-4 input-group">
        <input
          type="text"
          className="form-control"
          placeholder="Search"
          onChange={(e) => search(e.target.value)}
        />
        <div className="input-group-append">
          <select
            className="form-select"
            onChange={(e) => sort(e.target.value)}
          >
            <option>Select</option>
            <option value="asc">Price Ascending</option>
            <option value="desc">Price Descending</option>
          </select>
        </div>
      </div>
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
        {products.map((product) => {
          const { id, image, title, price } = product;
          return (
            <div key={id} className="col">
              <div className="card shadow-sm">
                <img src={image} alt={`image ${id}`} height={200} />
                <div className="card-body">
                  <p className="card-text">{title}</p>
                  <div className="d-flex justify-content-between align-items-center">
                    <small className="text-muted">{price}</small>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {button}
    </>
  );
};

export default Products;
