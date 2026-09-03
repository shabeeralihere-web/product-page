import React from "react";
import Product from "../components/Product";

function Products({ products, deleteProduct }) {

  return (
    <div className="products-page">

      <div className="products-header">

        <div>
          <p className="page-label">
            PRODUCT MANAGEMENT
          </p>

          <h1>Our Products</h1>

          <p>
            Manage all your products in one place.
          </p>
        </div>

      </div>


      {products.length === 0 ? (

        <div className="empty-products">

          <h2>No Products Yet</h2>

          <p>
            You haven't added any products yet.
          </p>

        </div>

      ) : (

        <div className="products-list">

          {products.map((product) => (

            <Product
              key={product.name}
              name={product.name}
              price={product.price}
              category={product.category}
              image={product.image}
              deleteProduct={deleteProduct}
            />

          ))}

        </div>

      )}

    </div>
  );
}

export default Products;