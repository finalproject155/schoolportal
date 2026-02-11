"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import fet from "@/assets/explore/Image.svg"
import { CircleChevronRight } from 'lucide-react';

const items = [
  { id: 1, title: "Academy Tour", img: fet },
  { id: 2, title: "Campus Tour", img: fet },
  { id: 3, title: "Hostel Tour", img: fet },
 
]

export default function ActivitiesSection() {
  return (
    <section className="py-10">
      <div className="max-w-6xl mx-auto px-6">
      

        <div className="grid grid-cols-1 sm:grid-cols-3  gap-6 max-w-ful mx-auto">
          {items.map((item) => (
            <motion.div
              key={item.id}
              whileHover={{ scale: 1.03 }}
              className="relative rounded-xl overflow-hidden cursor-pointer"
            >
              <Image
                src={item.img}
                alt={item.title}
                width={500}
                height={500}
                className="object-cover w-full h-full"
              />

              <div className="absolute inset-0 bg-black/30 flex  items-end p-4">
               <div className="flex flex-col justify-center ">
                    <div className="border-1 border-accent bg-accent px-6 rounded-r-2xl">
                        <p className="text-white font-lex font-medium text-sm">{item.title}</p>
                    </div>

                    <div className="flex flex-row justify-between items-center">
                        <p className="text-white text-[20px] font-black font-lex mt-2">Explore More</p>
                         <CircleChevronRight  width={20} height={20} className="text-white mt-3" />
                    </div>
                 </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}