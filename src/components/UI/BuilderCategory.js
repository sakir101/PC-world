import { addToCart } from "@/redux/cart/cartSlice";
import { Col, Row } from "antd";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { addToProduct, toggleState } from "@/redux/product/productSlice";
import toast, { Toaster } from "react-hot-toast";

const BuilderCategory = ({ allCategory }) => {
  const router = useRouter();

  const { products } = useSelector((state) => state.cart);
  const { status } = useSelector((state) => state.product);
  const dispatch = useDispatch();
  const productArray = [
    "CPU",
    "RAM",
    "Monitor",
    "Storage Device",
    "Motherboard",
    "Power Supply Unit",
    "Others",
  ];
  const notify = () => toast("Build PC Successfully");
  useEffect(() => {
    const categoriesData = sessionStorage.getItem("categoriesData");
    const categoriesObject = JSON.parse(categoriesData);

    dispatch(addToProduct(categoriesObject));
  }, [products]);
  useEffect(() => {
    if (products[0] !== undefined) {
      const productKeys = Object.keys(products[0]);

      if (productKeys.length === productArray.length) {
        dispatch(toggleState());
      }
    }
  }, [products]);
  useEffect(() => {
    const storedUserData = sessionStorage.getItem("userData");
    if (storedUserData) {
      const userData = JSON.parse(storedUserData);
      // Use the userData object as needed
      dispatch(addToCart(userData));
    }
  }, []);

  useEffect(() => {
    const handleRouteChange = () => {
      // Reload the page on route change
      window.location.reload();
    };
    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);
  return (
    <div>
      <div className="bg-lime-200 text-center p-5">
        <h1>PC Builder</h1>
        <p>Select your component</p>
      </div>
      <div className="w-full mx-0 lg:w-4/5 lg:mx-auto my-5 bg-slate-100 shadow-md py-3">
        <Row>
          <Col span={8}></Col>
          <Col span={8}>
            <h4 className="text-center">PC Builder</h4>
          </Col>
          <Col span={8} className="flex justify-end p-3">
            <button
              className="btn btn-primary btn-sm"
              disabled={!status}
              onClick={notify}
            >
              Build PC
            </button>
          </Col>
        </Row>
        <div className="divider"></div>
        <Row
          gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
          className="flex flex-col-reverse lg:flex-row"
        >
          {allCategory?.data?.map((category, index) => (
            <Col className="gutter-row" span={24} key={index}>
              <div className="flex justify-between items-center p-3">
                <div className="flex items-center justify-start">
                  <Image
                    src={category?.img}
                    width={100}
                    height={100}
                    responsive
                    alt="category image"
                  />
                  {products[0] === undefined ? (
                    <p className="mx-5 font-semibold">{category?.title} </p>
                  ) : (
                    <p className="mx-5 font-semibold">
                      {category?.title}
                      <span> </span>
                      {Object.entries(products[0]).map(([key, value]) => (
                        <span key={key}>
                          {key === category?.title && `:${value}`}
                        </span>
                      ))}
                    </p>
                  )}
                </div>
                <div>
                  <Link href={`/pcBuilder/${category?._id}`}>
                    <button className="btn btn-outline btn-sm">Select</button>
                  </Link>
                </div>
              </div>
              <div className="divider"></div>
            </Col>
          ))}
        </Row>
      </div>
      <Toaster />
    </div>
  );
};

export default BuilderCategory;
