import Image from "next/image";
import { useRouter } from "next/router";

const ErrorPage = () => {
  const router = useRouter();

  setTimeout(() => {
    router.push("/");
  }, 5000);
  return (
    <div>
      <Image
        layout="fill"
        objectFit="cover"
        alt="Error Message"
        src="https://colorlib.com/wp/wp-content/uploads/sites/2/404-error-page-templates.jpg"
      />
    </div>
  );
};

export default ErrorPage;
