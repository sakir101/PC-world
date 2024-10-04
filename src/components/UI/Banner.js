import { Carousel, Col, Row } from "antd";
import Image from "next/image";
import banner1 from "@/assets/images/banner/banner_1.png";
import banner2 from "@/assets/images/banner/banner_2.png";
import banner3 from "@/assets/images/banner/banner_3.png";

import Link from "next/link";

const contentStyle = {
  height: "625px",
  color: "#000",
};

const Banner = () => {
  return (
    <Row
      gutter={{
        xs: 8,
        sm: 16,
        md: 24,
        lg: 32,
      }}
      style={{ alignItems: "center" }}
    >
      <Col
        lg={{
          span: 12,
        }}
      >
        <h1 style={{ fontSize: "50px" }}>
          BUILD YOUR PC
          <br />
          WITH MINIMUM BUDGET
        </h1>
        <div
          className="line"
          style={{
            height: "5px",
            margin: "20px 0",
            background: "#000",
            width: "95%",
          }}
        ></div>

        <p
          style={{
            fontSize: "20px",
            display: "flex",
            justifyContent: "space-between",
            width: "90%",
            color: "gray",
            margin: "10px 0px",
          }}
        >
          This is your pc building website. Here you will get all kind of
          support to build your pc.
        </p>
        <Link href="/">
          <button className="btn btn-outline my-10">See Detail</button>
        </Link>
      </Col>

      <Col
        lg={{
          span: 12,
        }}
        style={contentStyle}
      >
        <Carousel autoplay dots={false}>
          <div>
            <Image
              src={banner1}
              alt="banner"
              width={200}
              height={200}
              layout="responsive"
            />
          </div>
          <div>
            <Image
              src={banner2}
              alt="banner"
              width={200}
              height={200}
              layout="responsive"
            />
          </div>
          <div>
            <Image
              src={banner3}
              alt="banner"
              width={200}
              height={200}
              layout="responsive"
            />
          </div>
        </Carousel>
      </Col>
    </Row>
  );
};

export default Banner;
