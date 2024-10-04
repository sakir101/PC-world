import RootLayout from "@/components/Layouts/RootLayout";
import BuilderCategory from "@/components/UI/BuilderCategory";

const PcBuilder = ({ allCategories }) => {
  return (
    <div className="my-5">
      <BuilderCategory allCategory={allCategories}></BuilderCategory>
    </div>
  );
};

export default PcBuilder;

PcBuilder.getLayout = function getLayout(page) {
  return <RootLayout>{page}</RootLayout>;
};

export const getStaticProps = async () => {
  const res = await fetch(
    "https://tech-world-server-psi.vercel.app/api/v1/categories"
  );
  const data = await res.json();

  return {
    props: {
      allCategories: data,
    },
    revalidate: 10,
  };
};
