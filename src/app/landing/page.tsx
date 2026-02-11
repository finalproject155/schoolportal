import React from 'react'
import Hero from "./componets/hero"
import Explore from "./componets/explore"
import Exploreimage from "./componets/exporeimage"
import Years from './componets/years'

export default function page() {
  return (
    <div>
        <Hero />
        <Explore />
        <Exploreimage  />
        <Years />   
    </div>
  )
}
