"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import fet from "@/assets/years/juj.svg"
import fat from "@/assets/years/kik.svg"
import fed from "@/assets/years/njn.svg"
import frt from "@/assets/years/yre.svg"
import { div } from "framer-motion/client"

const items = [
  { id: 1, title: "Expert Educators", img: fet, number: "300+" },
  { id: 2, title: "Job Placement", img: fat, number: "200+" },
  { id: 3, title: "Learning Resources", img: fed, number: "150+" },
   { id: 4, title: "Learners Served", img: frt, number: "100+" },
   { id: 4, title: "Learners Served", img: frt, number: "100+" },
 
 
]

export default function Years() {
  return (
  <div className="bg-gradient-to-r from-accent to-primary">
      <section className="py-10">

          <div className='flex flex-col items-center justify-center py-10'>
            <h2 className="text-2xl text-white font-bold mb-4">WU Over The Years </h2>
            <p className="text-white">eiusmod tempor incididunt ut labore et dolore.Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </div>

      <div className="max-w-6xl mx-auto">
      

        <div className="grid grid-cols-1 sm:grid-cols-5  gap-10 max-w-ful mx-auto">
          {items.map((item) => (
            <motion.div
              key={item.id}
              whileHover={{ scale: 1.03 }}
              className="relative rounded-xl overflow-hidden cursor-pointer"
            >
            <div className="flex flex-row gap-2 items-center">
                  <Image
                src={item.img}
                alt={item.title}
                width={50}
                height={50}
                className="object-cover w-full h-full"
              />

              <div className="flex flex-col items-start justify-center">
                <h2 className="text-[25px] font-bold font-lex">{item.number}</h2>
                <p className="text-[15px] text-white font-medium">{item.title}</p>
              </div>
            </div>

             
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  </div>
  )
}