import { Card, Col, Row } from "antd";
import Image from "next/image";
import Link from "next/link";
import { ArrowRightOutlined } from "@ant-design/icons";

const AllProducts = ({ allProducts }) => {
  const { Meta } = Card;
  return (
    <>
      <h1
        style={{
          textAlign: "center",
          fontSize: "50px",
          margin: "30px 0px",
        }}
      >
        All Products
      </h1>
      <Row gutter={[24, 16]}>
        {allProducts?.data?.map((product) => (
          <Col
            key={product.id}
            className="gutter-row"
            xs={24}
            sm={12}
            md={8}
            lg={6}
          >
            <Card
              hoverable
              cover={
                <Image
                  src={product?.img}
                  width={500}
                  height={200}
                  responsive
                  alt="product image"
                />
              }
            >
              <Meta title={product?.productName} />
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
                  margin: "3px 3px",
                  fontSize: "12px",
                }}
              >
                <span
                  style={{
                    color: "black",
                    fontWeight: "bold",
                    margin: "10px 0px",
                    fontSize: "12px",
                  }}
                >
                  Category:
                </span>
                <span> </span>
                <span
                  style={{
                    color: "black",
                    fontWeight: "bold",
                    margin: "10px 0px",
                    fontSize: "12px",
                  }}
                >
                  {product?.category}
                </span>
              </p>
              <p
                style={{
                  margin: "3px 3px",
                  fontSize: "12px",
                }}
              >
                <span
                  style={{
                    color: "black",
                    fontWeight: "bold",
                    margin: "10px 0px",
                    fontSize: "12px",
                  }}
                >
                  Status:
                </span>
                <span> </span>
                <span
                  style={{
                    color: "black",
                    fontWeight: "bold",
                    margin: "10px 0px",
                    fontSize: "12px",
                  }}
                >
                  {product?.status}
                </span>
              </p>
              <p
                style={{
                  margin: "3px 3px",
                  fontSize: "12px",
                }}
              >
                <span
                  style={{
                    color: "black",
                    fontWeight: "bold",
                    margin: "10px 0px",
                    fontSize: "12px",
                  }}
                >
                  Price:
                </span>
                <span> </span>
                <span
                  style={{
                    color: "black",
                    fontWeight: "bold",
                    margin: "10px 0px",
                    fontSize: "12px",
                  }}
                >
                  {product?.price}
                </span>
              </p>
              <p
                style={{
                  margin: "3px 3px",
                  fontSize: "12px",
                }}
              >
                <span
                  style={{
                    color: "black",
                    fontWeight: "bold",
                    margin: "10px 0px",
                    fontSize: "12px",
                  }}
                >
                  Rating:
                </span>
                <span> </span>
                <span
                  style={{
                    color: "black",
                    fontWeight: "bold",
                    margin: "10px 0px",
                    fontSize: "12px",
                  }}
                >
                  {product?.avgRating}
                </span>
                <span
                  style={{
                    color: "black",
                    fontWeight: "bold",
                    margin: "10px 0px",
                    fontSize: "12px",
                  }}
                >
                  /
                </span>
                <span
                  style={{
                    color: "black",
                    fontWeight: "bold",
                    margin: "10px 0px",
                    fontSize: "12px",
                  }}
                >
                  5
                </span>
              </p>

              <Link href={`/product/${product?._id}`}>
                <p
                  style={{
                    fontSize: "15px",
                    marginTop: "20px",
                    backgroundColor: "black",
                    color: "white",
                    width: "100%",
                    padding: "2px 5px ",
                    fontWeight: "300",
                    letterSpacing: "3px",
                    textAlign: "center",
                  }}
                >
                  See Detail <ArrowRightOutlined />
                </p>
              </Link>
            </Card>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default AllProducts;
