import React from "react";
import { CircleArrowRight } from 'lucide-react';
import Indicator from "@/components/ui/indicator";
import Image from "next/image";
import fet from "@/assets/landing/fey.svg"

const Hero = () => {
  return (
    <section className="relative w-full md:h-[calc(100vh-4rem)] py-10 md:py-24 px-4 md:px-10 overflow-hidden bg-gradient-to-r from-accent/10 to-white text-foreground">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-8 md:gap-12 md:my-10">
        <div className="flex flex-col items-center lg:items-start gap-2 lg:gap-6 text-center lg:text-left lg:w-1/2 w-full z-10">
          <Indicator text="Refined Learning. Better Results" />
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black leading-[1.1] tracking-tight text-foreground">
            Learning Without  {" "}
            <span className="text-accent">Stress</span>
          </h1>
          <p className="text-lg text-secondary max-w-xl leading-relaxed">
            Vendora helps students and teachers stay connected by organizing lessons, grades, announcements, and academic records in one simple dashboard.
          </p>
          <div className="flex flex-col sm:flex-row gap-2 lg:gap-3 mt-4">
            {/* <button className="btn-primary flex items-center justify-center font-bold text-base transition-all transform hover:scale-105">
              Request a Demo
            </button> */}
            <button className="flex items-center justify-center h-[46px] px-6 rounded-lg border border-border bg-accent text-foreground  font-bold text-white hover:bg-white hover:text-accent hover:border-accent transition-colors">
             
              Apply Now
               <CircleArrowRight className="mr-2 text-xl" />
            </button>
          </div>
          <div className="flex items-center gap-4 mt-6 text-sm text-muted">
            <div className="flex -space-x-2">
              <div
                className="w-8 h-8 rounded-full border-2 border-background bg-gray-300 bg-cover bg-center"
                data-alt="Portrait of a smiling young woman"
                style={{
                  backgroundImage:
                    "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCp1MLiC_o6SKfmzgFRmMBOu-LcfVZ4Q3FQXjTl9I4c2OBc6OJw2GFY3t9oPbnrqdNm-hP5HodmpoPA78wsT8XyBDD_EmJ7kYkh9nBQfN29_uQGbF7SVxHW3BCGj8pOFn0Mqnsbg9OHDVHy2VQZbfVaoiSF5X1aqpJTLMcjekzzJ_KEO1nPARvjd2aSUihjOsI2Hewk4xFLd24_j_hCPTd7Y_voLZj-mns-WFaCzmr90UJgOnxKHEVw2xN_GlrEVgzTDkV2_nHf2og')",
                }}
              ></div>
              <div
                className="w-8 h-8 rounded-full border-2 border-background bg-gray-300 bg-cover bg-center"
                data-alt="Portrait of a smiling young man"
                style={{
                  backgroundImage:
                    "url('https://lh3.googleusercontent.com/aida-public/AB6AXuA0InyNvxDAUohIc8u6ZP3ZSCM0LLi5kNDvD3F6aIBDnVP7mw41qnghgravJ7ybZWF2hK0Iz6zIS-7Host5lWV2B8gXIQvpe_LACAzmkWy-Wr56JtcU8fdiHVXdsZ0F4qxjEX90i_jgE_K8z7t1VSyJTuCqgtpddFLq8GmTYN6i6-GCSAc-ZypkdcLBOPbtf9Dr-mTcwvWzKq_7er8M78FjwUEkYD7EYmXz5O8Uuy27JKR2nkfVWvYMehVbI4n_5gKSX4pUVsUG8Cs')",
                }}
              ></div>
              <div
                className="w-8 h-8 rounded-full border-2 border-background bg-gray-300 bg-cover bg-center"
                data-alt="Portrait of a business owner"
                style={{
                  backgroundImage:
                    "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDXliMBZ8QHPUzC6NN_Yz1-ml0cuWKF4KF4kFohfcRRL3xvd_cBAEznJCzn0vybLZyV2UplJC7feDMa1lzA6_sL-RceGWDCqX0s-Rdz9wyP_JaXXZG27TTzgcQWrsvr_I74RHkaCWO-vRrZN31HCsoW5ooL99xw9mwCudUy9FnfBjnfvuEksQ5dECDea1DVxQ_VyfxNmYKkburfm2yjJSZJQ7cX1rvA1_Jyyx17kFPARdvYcipRbTBcFKt-NsvnUzuOqnBWTEz7O4o')",
                }}
              ></div>
            </div>
            <p>Trusted by 500+ local stores</p>
          </div>
        </div>

        {/* ... Right image ... */}
        <div className="w-full md:w-3/4 lg:w-1/2 relative">
          
          <Image src={fet} alt='logo' />

        </div>
      </div>
    </section>
  );
};

export default Hero;