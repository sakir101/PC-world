import RootLayout from "@/components/Layouts/RootLayout";
import { Col, Row, Modal } from "antd"; // Import Modal and Button
import Image from "next/image";
import { Input } from "antd";
import styles from "@/styles/Product.module.css";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addToProduct } from "@/redux/product/productSlice";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/router";

const ProductDetailPage = ({ product }) => {
  const { register, handleSubmit, setValue } = useForm();
  const dispatch = useDispatch();
  const router = useRouter();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [formData, setFormData] = useState({
    id: product?.data._id,
    productName: product?.data.productName,
    img: product?.data.img,
    category: product?.data.category,
    status: product?.data.status,
  });

  const handleDelete = async (id) => {
    const proceed = window.confirm(
      `Are you sure you want to delete this item?`
    );
    if (proceed) {
      try {
        const res = await fetch(
          `https://tech-world-server-psi.vercel.app/api/v1/products/delete-product/${id}`,
          {
            method: "DELETE",
          }
        );

        if (res.ok) {
          toast.success("Product deleted successfully");
          router.push("/");
        } else {
          toast("Failed to delete the product");
        }
      } catch (error) {
        toast.error("An error occurred while deleting the product");
        console.error("Error deleting product:", error);
      }
    }
  };

  const onSubmit = async (data) => {
    try {
      const response = await fetch(
        `https://tech-world-server-psi.vercel.app/api/v1/products/${product?.data._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (response.ok) {
        alert("Comment posted successfully");
      } else {
        alert("Comment posted failed");
      }
    } catch (error) {
      console.error("Error while updating product:", error);
    }
  };

  const handleModalOpen = () => {
    setIsModalVisible(true);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleUpdateProduct = async () => {
    try {
      const response = await fetch(
        `https://tech-world-server-psi.vercel.app/api/v1/products/${formData.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        toast.success("Product updated successfully");
        handleModalClose();
      } else {
        toast.error("Failed to update the product");
      }
    } catch (error) {
      toast.error("An error occurred while updating the product");
      console.error("Error updating product:", error);
    }
  };

  useEffect(() => {
    const categoriesData = sessionStorage.getItem("categoriesData");
    const categoriesObject = JSON.parse(categoriesData);

    dispatch(addToProduct(categoriesObject));
  }, [dispatch]);

  return (
    <>
      <div className="w-full lg:w-3/4 mx-auto p-6">
        <Row
          gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
          className="flex flex-col-reverse lg:flex-row"
        >
          <Col className="gutter-row" sm={24} lg={12}>
            <div>
              {" "}
              <h1 style={{ fontSize: "25px" }}>{product?.data.productName}</h1>
              <div
                className="line"
                style={{
                  height: "5px",
                  margin: "20px 0",
                  background: "#000",
                  width: "100%",
                }}
              ></div>
              <p
                style={{
                  width: "100%",
                  color: "gray",
                  margin: "10px 0px",
                  fontSize: "14px",
                  fontWeight: "bold",
                }}
              >
                <span>Category:</span> <span></span>{" "}
                <span>{product?.data.category}</span>
              </p>
              <p
                style={{
                  width: "100%",
                  color: "gray",
                  margin: "10px 0px",
                  fontSize: "14px",
                  fontWeight: "bold",
                }}
              >
                <span>Status:</span> <span></span>{" "}
                <span>{product?.data.status}</span>
              </p>
              <p
                style={{
                  width: "100%",
                  color: "gray",
                  margin: "10px 0px",
                  fontSize: "14px",
                  fontWeight: "bold",
                }}
              >
                <span>Price:</span> <span></span>{" "}
                <span>{product?.data.price}</span>
              </p>
              <p
                style={{
                  width: "100%",
                  color: "gray",
                  margin: "10px 0px",
                  fontSize: "14px",
                  fontWeight: "bold",
                }}
              >
                Feature:{" "}
              </p>
              <ul
                style={{
                  listStyleType: "disc",
                  paddingLeft: "20px",
                  width: "100%",
                  color: "gray",
                  margin: "10px 0px",
                  fontSize: "14px",
                  fontWeight: "bold",
                }}
              >
                {product?.data?.feature?.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
              <p
                style={{
                  width: "100%",
                  color: "gray",
                  margin: "10px 0px",
                  fontSize: "14px",
                  fontWeight: "bold",
                }}
              >
                <span>Rating:</span> <span></span>{" "}
                <span>{product?.data.avgRating}</span> <span></span>
                <span>/</span> <span></span> <span>5</span> <span></span>
              </p>
              <p
                style={{
                  fontSize: "14px",
                  width: "100%",
                  color: "gray",
                  margin: "10px 0px",
                  fontSize: "14px",
                  fontWeight: "bold",
                }}
              >
                {product?.data.description}
              </p>
              <button
                className="btn btn-sm bg-red-500 text-white hover:bg-red-700"
                onClick={() => handleDelete(product?.data._id)}
              >
                Delete
              </button>
              <button
                className="btn btn-sm bg-blue-500 text-white hover:bg-blue-700 ml-2"
                onClick={handleModalOpen}
              >
                Update
              </button>
            </div>
          </Col>
          <Col className="gutter-row mx-auto" sm={24} lg={12}>
            <div>
              {" "}
              <Image
                src={product?.data.img}
                width={500}
                height={500}
                layout="responsive"
                alt="product image"
              />
            </div>
          </Col>
        </Row>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            width: "75%",
            margin: "40px auto",
          }}
        >
          <Input.TextArea
            {...register("reviews")}
            placeholder="Write your comment"
            autoSize={{
              minRows: 2,
              maxRows: 6,
            }}
            style={{ border: "2px solid gray" }}
            onChange={(e) => setValue("reviews", e.target.value)}
          />
          <div
            style={{
              margin: "5px 0",
            }}
          ></div>
          <div className={styles.rate}>
            <input
              type="radio"
              id="star5"
              name="rate"
              value="5"
              {...register("rating")}
            />
            <label for="star5" title="text">
              5 stars
            </label>
            <input
              type="radio"
              id="star4"
              name="rate"
              value="4"
              {...register("rating")}
            />
            <label for="star4" title="text">
              4 stars
            </label>
            <input
              type="radio"
              id="star3"
              name="rate"
              value="3"
              {...register("rating")}
            />
            <label for="star3" title="text">
              3 stars
            </label>
            <input
              type="radio"
              id="star2"
              name="rate"
              value="2"
              {...register("rating")}
            />
            <label for="star2" title="text">
              2 stars
            </label>
            <input
              type="radio"
              id="star1"
              name="rate"
              value="1"
              {...register("rating")}
            />
            <label for="star1" title="text">
              1 star
            </label>
          </div>
          <div>
            <input
              type="submit"
              value="Submit"
              style={{
                margin: "10px 0px",
                width: "100%",
                padding: "10px 10px",
                backgroundColor: "blue",
                color: "white",
                border: "1px solid blue",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            />
          </div>
        </div>
      </form>
      <div style={{ padding: "0px 20px" }}>
        {product?.data?.reviews?.map((review, index) => (
          <div key={index} className="flex gap-3 items-center mb-5">
            <p
              style={{
                backgroundColor: "lightcyan",
                padding: "10px 10px",
                borderRadius: "10px",
                margin: "10px 2px",
                width: "50%",
              }}
            >
              {review}
            </p>
          </div>
        ))}
        <Modal
          title="Update Product"
          visible={isModalVisible}
          onOk={handleUpdateProduct}
          onCancel={handleModalClose}
          okText="Update"
          cancelText="Cancel"
        >
          <div style={{ marginBottom: "20px" }}>
            <Input
              name="productName"
              placeholder="Product Name"
              value={formData.productName}
              onChange={handleInputChange}
              style={{ marginBottom: "10px" }}
            />
            <Input
              name="category"
              placeholder="Category"
              value={formData.category}
              onChange={handleInputChange}
              style={{ marginBottom: "10px" }}
            />
            <Input
              name="status"
              placeholder="Status"
              value={formData.status}
              onChange={handleInputChange}
              style={{ marginBottom: "10px" }}
            />
            <Input
              name="img"
              placeholder="Image URL"
              value={formData.img}
              onChange={handleInputChange}
              style={{ marginBottom: "10px" }}
            />
          </div>
        </Modal>
        <Toaster />
      </div>
    </>
  );
};

export default ProductDetailPage;

ProductDetailPage.getLayout = function getLayout(page) {
  return <RootLayout>{page}</RootLayout>;
};

export const getServerSideProps = async (context) => {
  const { params } = context;
  const res = await fetch(
    `https://tech-world-server-psi.vercel.app/api/v1/products/${params.productId}`
  );
  const data = await res.json();

  return {
    props: {
      product: data,
    },
  };
};
