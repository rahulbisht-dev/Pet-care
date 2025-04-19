import { IoPawSharp } from "react-icons/io5";
import { homeassets } from "../../assets/frontend_assets/home/assets";

const Homepara = () => {
    
  return (

    <section className="lg:px-8 lg:py-24 px-4 bg-white flex flex-col lg:flex-row gap-20">

      {/* writing content section */}
      <div className="flex gap-12 flex-col flex-1  lg:gap-12 justify-center">
        <h1 className="text-3xl text-lg:5xl font-bold leading-tight text-neutral-800">We are committed to ensuring the health, happiness, and care of your cherished pets.</h1>
        <p data-aos="zoom-out" className="text-[16px] lg:w-[70%] text-gray-600">At PetCare, we go beyond just pet care – we are a dedicated family of passionate animal lovers who truly understand the needs of your furry, feathered, and scaled companions. With years of experience and a deep commitment to pet well-being, our team strives to provide exceptional care, ensuring your pets feel safe, loved, and nurtured. From expert veterinary services to personalized attention, we prioritize their health, happiness, and comfort. When your pet is with us, they are not just another animal – they are part of our family, receiving the same love and care as our own.</p>
      </div>

      {/* image section */}

      <div className="flex-1  relative flex justify-center">
        <img data-aos="fade-up" src={homeassets.home_cat2} alt="" className="w-130"/>
        <IoPawSharp className="absolute hidden lg:block left-0 bottom-[10%] text-6xl rotate-30 paw-animation1 text-[#c2a79a]"/>
        <IoPawSharp className="absolute hidden left-0 lg:block top-[10%] text-6xl -rotate-30 paw-animation2 text-[#c2a79a]"/>
        <IoPawSharp className="absolute   left-0 bottom-0 text-4xl rotate-30 paw-animation1 text-[#c2a79a]"/>
        <IoPawSharp className="absolute right-0 bottom-0 text-4xl -rotate-30 paw-animation2 text-[#c2a79a]"/>
        <IoPawSharp/>
      </div>

    </section>
  )
}

export default Homepara;