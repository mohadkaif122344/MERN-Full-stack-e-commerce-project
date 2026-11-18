import Title from "../components/Title";
import contactUs from "../assets/contactUs.avif";
import NewsletterBox from "../components/NewsletterBox";

const Contact = () => {
  return (
    <div>
      <div className="text-center text-2xl pt-10 border-t">
        <Title text1={"CONTACT"} text2={"US"} />
      </div>

      <div className="my-12 flex flex-col md:flex-row items-center justify-center gap-10 md:gap-16 mb-28 px-5 md:px-10">
        <img
          className="w-full max-w-[450px] h-[350px] md:h-[450px] object-cover rounded-md"
          src={contactUs}
          alt="Our store"/>

        <div className="flex flex-col justify-center items-start gap-5 w-full md:max-w-[450px]">
          <p className="font-semibold text-2xl text-gray-800 dark:text-neutral-300">Our Store</p>

          <p className="text-gray-500 leading-7  dark:text-neutral-400">
            Near Bombay Plaza <br />
            Suite 350, Rajkot, Gujarat, India
          </p>

          <p className="text-gray-500 leading-7 dark:text-neutral-400">
            Tel: (415) 555-0132 <br />
            Email: DreamsClothing@gmail.com
          </p>

          <p className="font-semibold text-xl text-gray-800 pt-3 dark:text-neutral-400">
            Careers at Dreams Clothing
          </p>

          <p className="text-gray-500 leading-7 dark:text-neutral-400">
            Learn more about our teams and job openings.
          </p>

          <button className="border bg-neutral-600 px-8 py-4 text-sm hover:bg-neutral-800 text-white  rounded-md duration-300 ">
            Explore Jobs
          </button>
        </div>
      </div>

      <NewsletterBox />
    </div>
  );
};

export default Contact;
