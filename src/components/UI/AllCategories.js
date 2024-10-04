import { Card, Col, Row } from "antd";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { ArrowRightOutlined } from "@ant-design/icons";

const AllCategories = ({ allCategories }) => {
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
        All Categories
      </h1>
      <Row gutter={[24, 16]}>
        {allCategories?.data?.map((category) => (
          <Col
            key={category.id}
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
                  src={category?.img}
                  width={500}
                  height={200}
                  responsive
                  alt="category image"
                />
              }
            >
              <Meta title={category?.title} />
              <div
                className="line"
                style={{
                  height: "5px",
                  margin: "20px 0",
                  background: "#000",
                  width: "100%",
                }}
              ></div>

              <Link href={`/categories/${category?._id}`}>
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

export default AllCategories;
