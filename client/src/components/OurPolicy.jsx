import { FaExchangeAlt, FaHeadset } from "react-icons/fa";
import { MdAssignmentReturn } from "react-icons/md";

const OurPolicy = () => {
  return (
    <div className="flex flex-col sm:flex-row justify-around gap-12 sm:gap-2 text-center py-20 text-xs sm:text-sm md:text-base text-gray-700">
      <div>
        <FaExchangeAlt className="w-12 h-12 mx-auto mb-5 text-neutral-600" />
        <p className="font-semibold dark:text-neutral-300">Easy Exchange Policy</p>
        <p className="text-gray-400">We offer hassle free exchange policy</p>
      </div>

      <div>
        <MdAssignmentReturn className="w-12 h-12 mx-auto mb-5 text-neutral-600" />
        <p className="font-semibold dark:text-neutral-300">7 Days Return Policy</p>
        <p className="text-gray-400">We provide 7 days free return policy</p>
      </div>

      <div>
        <FaHeadset className="w-12 h-12 mx-auto mb-5 text-neutral-600"/>
        <p className="font-semibold dark:text-neutral-300">Best customer support</p>
        <p className="text-gray-400">We provide 24/7 customer support</p>
      </div>
    </div>
  );
};

export default OurPolicy;
