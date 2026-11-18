import logo from "../assets/logo2.png";
import {FaFacebookF,FaInstagram,FaTwitter,FaPinterestP} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="w-full border-t border-gray-200 bg-[#F8F5F0] text-gray-600 dark:bg-neutral-950">
      <div className="mx-auto max-w-screen-2xl px-4 py-10 sm:px-6 md:py-5 xl:px-12">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-12">
          <div>
            <div className="flex">
              <img src={logo} alt="" className="w-14 h-14 rounded-full" />
              <p className="text-xl py-4 font-bold dark:text-neutral-200 text-gray-950">
                Style<span className="text-neutral-600">Hub</span>
              </p>
            </div>
            <p className="text-sm leading-6 dark:text-neutral-400">
              Discover quality products at great prices. Shop your favorites and
              enjoy a smooth shopping experience.
            </p>
            <div className="mt-5 flex gap-4 dark:text-neutral-400">
              {[FaFacebookF, FaInstagram, FaTwitter, FaPinterestP].map(
                (Icon, i) => (
                  <p key={i} className="transition hover:text-neutral-600">
                    <Icon />
                  </p>
                ),
              )}
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-neutral-300">
              Quick Links
            </h3>
            <ul className="flex flex-col gap-3 text-sm dark:text-neutral-400">
              <li className="hover:text-neutral-600">Home</li>
              <li className="hover:text-neutral-600">Shop</li>
              <li className="hover:text-neutral-600">About Us</li>
              <li className="hover:text-neutral-600">Contact</li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-neutral-300">
              Customer
            </h3>
            <ul className="flex flex-col gap-3 text-sm dark:text-neutral-400">
              <li className="hover:text-neutral-600">Help Center</li>
              <li className="hover:text-neutral-600">Shipping Policy</li>
              <li className="hover:text-neutral-600">Returns & Refunds</li>
              <li className="hover:text-neutral-600">Privacy Policy</li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-neutral-300">
              Stay Connected
            </h3>
            <p className="mb-4 text-sm leading-6 dark:text-neutral-500">
              Subscribe to receive updates and special offers.
            </p>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="flex flex-col gap-3"
            >
              <input
                type="email"
                required
                placeholder="Enter your email"
                className="rounded-lg border border-gray-400 px-3 py-3  outline-none focus:border-neutral-600 focus:ring-neutral-300 dark:bg-neutral-950 "
              />
              <button
                type="submit"
                className="w-full rounded-lg bg-neutral-600 py-3 font-semibold text-white hover:bg-neutral-800 duration-300"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t dark:border-gray-600 pt-6 pb-8 sm:pb-0 text-center text-sm sm:flex-row sm:text-left dark:text-neutral-500">
          <p>© {new Date().getFullYear()} MyStore. All rights reserved.</p>
          <p>Designed with care for your shopping experience.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
