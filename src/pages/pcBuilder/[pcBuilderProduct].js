import { Card, Col, Row } from "antd";
import Image from "next/image";
import RootLayout from "@/components/Layouts/RootLayout";
import Link from "next/link";

const PcBuilderProductPage = ({ allProducts, allCategories }) => {
  const { Meta } = Card;

  const saveData = (name) => {
    const existingData = sessionStorage.getItem("userData");
    let newData = {};

    if (existingData) {
      newData = JSON.parse(existingData);
    }

    if (allCategories.data && allCategories.data.title) {
      newData[allCategories.data.title] = name;
    }

    sessionStorage.setItem("userData", JSON.stringify(newData));
  };
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
              <div className="flex justify-center my-5">
                <Link href="/pcBuilder">
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={() => saveData(product?.productName)}
                  >
                    Add to PC Builder
                  </button>
                </Link>
              </div>
            </Card>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default PcBuilderProductPage;

PcBuilderProductPage.getLayout = function getLayout(page) {
  return <RootLayout>{page}</RootLayout>;
};

export const getServerSideProps = async (context) => {
  const { params } = context;

  const res = await fetch(
    `https://tech-world-server-psi.vercel.app/api/v1/categories/${params.pcBuilderProduct}`
  );
  const data = await res.json();

  const res2 = await fetch(
    `https://tech-world-server-psi.vercel.app/api/v1/productName/${data?.data?.title}`
  );
  const data2 = await res2.json();

  return {
    props: {
      allProducts: data2,
      allCategories: data,
    },
  };
};
