import Image from "next/image";
import React from "react";
import { Container } from "@/components/Container";

const data = {
  imgPos: "right",
  title: "Why Choose Us?",
  desc: "We are a team of experienced professionals who are passionate about what we do. We are committed to providing high-quality services to our clients. Here are some reasons why you should choose us.",
};

export function ContentWithImage() {
  return (
    <Container className="flex flex-wrap mb-20 lg:gap-10 lg:flex-nowrap ">
      <div
        className={`flex items-center justify-center w-full lg:w-1/2 ${
          data.imgPos === "right" ? "lg:order-1" : ""
        }`}
      >
        <div>
          <Image
            src={"/img/benefit-two.png"}
            width="521"
            height="521"
            alt="Benefits"
            className={"object-cover"}
          />
        </div>
      </div>

      <div
        className={`flex flex-wrap items-center w-full lg:w-1/2 ${
          data.imgPos === "right" ? "lg:justify-end" : ""
        }`}
      >
        <div>
          <div className="flex flex-col w-full mt-4">
            <h3 className="max-w-2xl mt-3 text-3xl font-bold leading-snug tracking-tight text-gray-800 lg:leading-tight lg:text-4xl dark:text-white">
              {data.title}
            </h3>

            <p className="max-w-2xl py-4 text-lg leading-normal text-gray-500 lg:text-xl xl:text-xl dark:text-gray-300">
              {data.desc}
            </p>
          </div>

        </div>
      </div>
    </Container>
  );
}



