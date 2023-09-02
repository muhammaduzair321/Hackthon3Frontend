"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaFacebook , FaTwitter , FaInstagram , FaLinkedin , FaGithub } from "react-icons/fa";
const Footer = () => {
  const path = usePathname();
  return (
    <footer className="py-8 border-t-2 border-gray-200 border-dotted">
      <div className=" container mx-auto ">
        <div className="flex flex-col gap-4 justify-center items-center">
          <nav className=" flex gap-2 md:gap-4 ">
            <Link
              className={`${
                path === "/"
                  ? "text-[#570DF8]"
                  : "text-black hover:text-[#570DF8]"
              }`}
              href="/"
            >
              Home
            </Link>
            <Link
              className={`${
                path.includes("blog")
                  ? "text-[#570DF8]"
                  : "text-black hover:text-[#570DF8]"
              }`}
              href="/blog"
            >
              Blog
            </Link>
          </nav>
          <div className="flex gap-4  multi-color-border  pr-4 px-3">
            <Link href={""}>
              <div className=" transition duration-500 ease-out text-2xl text-[#1877F2] hover:text-black">
                <FaFacebook />
              </div>
            </Link>
            <Link href={""}>
              <div className=" transition duration-500 ease-out text-2xl text-[#1DA1F2] hover:text-black">
                <FaTwitter />
              </div>
            </Link>
            <Link href={""}>
              <div className=" transition duration-500 ease-out text-2xl text-[#E1306C] hover:text-black">
                <FaInstagram />
              </div>
            </Link>
            <Link href={""}>
              <div className=" transition duration-500 ease-out text-2xl text-[#0A66C2] hover:text-black">
                <FaLinkedin />
              </div>
            </Link>
            <Link href={""}>
              <div className=" transition duration-500 ease-out text-2xl text-[#333] hover:text-black">
                <FaGithub />
              </div>
            </Link>
          </div>
        </div>
        <div className="mt-6 text-center text-gray-500">
          <p>&copy; {new Date().getFullYear()} Your Blog Name. All rights reserved. <br /> Designed and Developed By <span className=" font-bold font-serif text-black">Muhammad Uzair Ahmad</span></p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
