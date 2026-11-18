import about from "../assets/about.avif";
import NewsletterBox from "../components/NewsletterBox";
import Title from "../components/Title";

const About = () => {
  return (
    <div>
      <div className="text-2xl text-center pt-8 border-t">
        <Title text1={"ABOUT"} text2={"US"} />
      </div>
      <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16 my-10 md:my-10 px-5 md:px-10">
        <img
          src={about}
          alt="About us"
          className="w-full md:w-[40%] max-w-[450px] h-[350px] md:h-[450px] object-cover rounded-md"/>

        <div className="flex flex-col justify-center gap-5 md:w-[60%] text-sm md:text-base text-gray-600 leading-7 md:pb-32 dark:bg-gray-950 dark:text-neutral-400">
          <p>
            MyStore was created with a passion for fashion and a vision to make stylish clothing accessible to everyone. We believe that clothing is more than just what you wear – it's a way to express your personality, confidence, and individuality.
          </p>

          <p>
            Our collection brings together modern trends, timeless styles, and everyday essentials to suit different tastes and lifestyles. From casual wear to stylish outfits, we carefully select clothing that combines comfort, quality, and elegance.
          </p>

          <b className="text-gray-800 text-xl dark:bg-gray-950 dark:text-neutral-300">Our Mission</b>

          <p>
            At Forever, we aim to make fashion shopping simple and enjoyable by offering a variety of styles that help you look good and feel confident every day.
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 mb-20 px-5 md:px-10">
        <div className="border px-10 md:px-20 py-8 sm:py-20 flex flex-col gap-5 rounded-md ">
          <b className="text-xl dark:text-neutral-300">Quality Assurance:</b>
          <p className="text-gray-600  dark:text-neutral-400">
           We believe that great fashion starts with great quality. Every clothing item is carefully selected to ensure comfort, durability, and style, so you can enjoy fashion with confidence.
          </p>
        </div>
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5 rounded-md">
          <b className="text-xl dark:text-neutral-300">Convenience:</b>
          <p className="text-gray-600 dark:bg-gray-950 dark:text-neutral-400">
           We make fashion shopping simple and convenient. Explore our latest collections, discover your favorite styles, and place orders effortlessly through our user-friendly website.
          </p>
        </div>
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5 rounded-md">
          <b className="text-xl dark:text-neutral-300">Exceptional Customer Service:</b>
          <p className="text-gray-600 dark:bg-gray-950 dark:text-neutral-400">
            Your satisfaction is our priority. Our dedicated support team is always ready to assist you with your questions, orders, and concerns, ensuring a smooth and enjoyable shopping experience.
          </p>
        </div>
      </div>
      <NewsletterBox />
    </div>
  );
};

export default About;
