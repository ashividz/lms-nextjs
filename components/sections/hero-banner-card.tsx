"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";

import { Button } from "../ui/button";
import Image from "next/image";
import Container from "@/components/container";
import ratingImage from "@/public/assets/google-rating.webp";

interface BannerProps {
  banner?: any;
  className?: string;
}

export default function HeroBannerCard({ banner, className }: BannerProps) {
  const { title, description, spanTxt, image } = banner;

  return (
    <div
      className={cn(
        "w-full flex items-center bg-gradient-to-br from-cyan-200 via-sky-300 to-cyan-400/65 bg-opacity-25",
        className
      )}
    >
      <Container>
        <div className="flex flex-col lg:flex-row items-center lg:items-start justify-center lg:justify-start">
          <div className="order-2 lg:order-1 lg:mt-0 text-center lg:text-start w-full lg:w-1/2 ">
            <Image
              src={ratingImage}
              alt="Unitus Google Rating"
              width={180}
              height={100}
              className="mx-auto lg:mx-0 mb-6"
            />

            <h2 className="text-2xl lg:text-3xl xl:text-5xl mb-6 font-semibold transition-all duration-1000 ease-in-out transform animate-slide-in">
              {title}
            </h2>

            <p className="text-sm mb-6 animate-slide-up">{description}</p>
            <span className="text-sm sm:text-sm md:text-xl bg-white p-2 rounded-full text-webprimary">
              {spanTxt}
            </span>
            <div className="mt-10">
              <Link href={`${banner.btnUrl}`}>
                <Button
                  variant="destructive"
                  size="lg"
                  className="animate-bounce hover:animate-none"
                >
                  {banner.btnTxt}
                </Button>
              </Link>
            </div>
          </div>
          <div className="order-2 lg:order-1 mt-8 lg:mt-0 lg:ml-auto">
            <Image
              src={image}
              alt={title}
              width={500}
              height={500}
              className="self-end"
            />
          </div>
        </div>
      </Container>
    </div>
  );
}
