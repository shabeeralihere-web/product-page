import React, { useEffect } from "react";
import axios from "axios"
import Product from "../Components/Product";
import { useState } from "react";

function Products() {

  const [products,setProducts] = useState([])

  function handleProductDeleted(id) {
  setProducts(
    products.filter((product) => product._id !== id)
  );
}

  useEffect(()=>{
    getProducts();
  },[]);
  const getProducts = async ()=>{
    try{
      const response = await axios.get("http://localhost:8000/api/products/getProducts");
       console.log(response.data);
       setProducts(response.data.data);

    }
    catch(error){
    console.log(error);
    }
  }
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
              key={product._id}
              id={product._id}
              name={product.name}
              price={product.price}
              category={product.category}
              image={product.image}
              // deleteProduct={deleteProduct}
               onDelete={handleProductDeleted}
            />

          ))}

        </div>

      )}

    </div>
  );
}

export default Products;