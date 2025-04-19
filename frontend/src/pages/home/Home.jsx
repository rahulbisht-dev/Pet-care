import { Callus } from "./callus"
import Homepara from "./homepara"
import Homeservice from "./homeservices"
import Landing from "./Landing"
import { Testimonials } from "./testimonials"
import Values from "./values"

const Home = () => {

  return (
    <section className="overflow-hidden">
        <Landing/>
        <Homeservice/>
        <Homepara/>
        <Values/>
        <Testimonials/>
        <Callus/>
    </section>
  )
}

export default Home