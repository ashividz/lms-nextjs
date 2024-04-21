import Image from "next/image";
import TestimonialData from "@/data/testimonials.json";

const HomeTestimonial = () => {
  return (
    <>
      {TestimonialData &&
        TestimonialData.testimonialData.map((data, index) => (
          <div className="overflow-x-auto whitespace-nowrap my-8" key={index}>
            <div className="flex justify-center my-4">
              {data.left.map((item, innerIndex) => (
                <div
                  className={`flex-shrink-0 w-96 ${
                    index % 2 === 0
                      ? "bg-gradient-to-r from-blue-400 to-purple-400"
                      : "bg-gradient-to-r from-pink-400 to-rose-400"
                  } rounded-lg overflow-hidden mx-4 transition-transform ease-out duration-500 transform hover:-translate-x-4`}
                  key={innerIndex}
                >
                  <div className="p-4">
                    <div className="mb-4">
                      <Image
                        src={item.img}
                        width={item.wtd ? item.wtd : 97}
                        height={item.ht ? item.ht : 50}
                        alt="Client Images"
                      />
                    </div>
                    <p className="text-gray-800 text-sm mb-4">{item.desc}</p>
                    <div className="flex items-center">
                      <div className="mr-4">
                        <Image
                          src={item.client}
                          width={40}
                          height={40}
                          alt="Client Images"
                        />
                      </div>
                      <div>
                        <p className="text-lg font-semibold text-gray-800">
                          {item.title}
                        </p>
                        <p className="text-sm italic text-gray-500">
                          {item.position}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-center my-4">
              {data.right.map((item, innerIndex) => (
                <div
                  className={`flex-shrink-0 w-96 ${
                    index % 2 !== 0
                      ? "bg-gradient-to-r from-blue-400 to-purple-400"
                      : "bg-gradient-to-r from-pink-400 to-rose-400"
                  } rounded-lg overflow-hidden mx-4`}
                  key={innerIndex}
                >
                  <div className="p-4">
                    <div className="mb-4">
                      <Image
                        src={item.img}
                        width={item.wtd ? item.wtd : 97}
                        height={item.ht ? item.ht : 50}
                        alt="Client Images"
                      />
                    </div>
                    <p className="text-gray-800 text-sm mb-4">{item.desc}</p>
                    <div className="flex items-center">
                      <div className="mr-4">
                        <Image
                          src={item.client}
                          width={40}
                          height={40}
                          alt="Client Images"
                        />
                      </div>
                      <div>
                        <p className="text-lg font-semibold text-gray-800">
                          {item.title}
                        </p>
                        <p className="text-sm italic text-gray-500">
                          {item.position}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
    </>
  );
};

export default HomeTestimonial;
