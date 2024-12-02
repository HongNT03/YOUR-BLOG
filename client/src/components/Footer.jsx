import { Footer } from "flowbite-react";
import { Link } from "react-router-dom";
import { BsFacebook } from "react-icons/bs";

const FooterComponent = () => {
  return (
    <Footer container className="border border-t-8 border-teal-500">
      <div className="w-full max-w-7xl mx-auto">
        <div className="grid w-full justify-between sm:flex md:grid-cols-1">
          {/* Logo */}
          <div className="">
            <Link
              to="/"
              className="self-center whitespace-nowrap text-lg sm:text-xl font-semibold dark:text-white"
            >
              <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">
                YOUR
              </span>
              Blog
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:mt-4 sm:grid-cols-3 sm:gap-6">
            {/* col-1 */}
            <div>
              <Footer.Title title="About" />
              <Footer.LinkGroup col>
                <Footer.Link href="/about">Your Blog</Footer.Link>
              </Footer.LinkGroup>
            </div>
            {/* col-2 */}
            <div>
              <Footer.Title title="Follow HongNT" />
              <Footer.LinkGroup col>
                <Footer.Link
                  href="https://www.linkedin.com/in/hongnt/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  My LinkedIn
                </Footer.Link>
                <Footer.Link
                  href="https://github.com/HongNT03"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  My GitHub
                </Footer.Link>
              </Footer.LinkGroup>
            </div>
            {/* col-3 */}
            <div>
              <Footer.Title title="Legal" />
              <Footer.LinkGroup col>
                <Footer.Link href="#">Privacy Policy</Footer.Link>
                <Footer.Link href="#">Terms &amp; Conditions</Footer.Link>
              </Footer.LinkGroup>
            </div>
          </div>
        </div>
        <Footer.Divider />
        <div className="">
          <Footer.Copyright
            href="#"
            by="HongNT Project"
            year={2024}
          />
        </div>
      </div>
    </Footer>
  );
};

export default FooterComponent;
