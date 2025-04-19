import { homeassets } from "../../assets/frontend_assets/home/assets";

const Values = () =>{

    return(
        <section className="lg:px-8 lg:py-20  flex flex-col gap-12 justify-between">

            {/* Heading */}

            <div className="text-center">
                <h1 className="lg:text-6xl text-4xl font-bold">Our Values</h1>
            </div>

{/* fssfauihfiuashfuisahufhsadufhsaiudhf;asduhflasdhfuahdhsofsauf */}


             {/* Body */}

            <div className="rounded-lg flex flex-col lg:flex-row gap-4 px-4 lg:h-120">

                {/* Value 1 */}

               <div data-aos="fade-up" className="lg:flex-1 rounded-lg  flex flex-col h-full justify-between p-8  group  relative ">
                   <img src={homeassets.value1} alt="" className="absolute inset-0 w-full h-full object-cover rounded-lg z-[-10]"/>
                   <div>
                     <button data-aos="zoom-out" className="border-white border-2 rounded-full px-10 py-4 text-white font-bold group-hover:bg-white group-hover:text-black transition-all duration-200 z-30">Compassion</button>
                   </div>
                   <p data-aos="zoom-in" className="text-white font-bold">We approach every pet with empathy and kindness, ensuring their comfort and well-being</p>
                   <div className="absolute inset-0 bg-black/30 z-[-10]"/>
               </div>


               <div className="lg:w-[65%]  rounded-lg flex flex-col  justify-between h-full">

                   <div className="flex flex-col lg:flex-row  lg:h-[48%] justify-between ">

                    {/* Value 2 */}

                       <div data-aos="fade-up" className="flex flex-col p-8 justify-between lg:w-[49%] h-80 lg:h-full  rounded-lg  group relative ">
                         <img src={homeassets.value2} alt="" className="absolute inset-0 w-full h-full object-cover rounded-lg z-[-10]"/>
                         <div>
                           <button data-aos="zoom-out" className="border-white border-2 rounded-full px-10 py-4 text-white font-bold group-hover:bg-white group-hover:text-black transition-all duration-200">Excellence</button>
                         </div>
                           <p data-aos="zoom-in" className="text-white font-bold">We strive for excellence in all we do, from medical to service.</p>
                           <div className="absolute inset-0 bg-black/30 z-[-10]"/>
                       </div>

                       {/* Value 3 */}

                       <div data-aos="fade-up" className="flex flex-col p-8 justify-between  lg:w-[49%] h-80 lg:h-full  rounded-lg  group relative ">
                          <img src={homeassets.value3} alt="" className="absolute inset-0 w-full h-full object-cover rounded-lg z-[-10]" />
                           <div>
                             <button data-aos="zoom-out" className="border-white border-2 rounded-full px-10 py-4 text-white font-bold group-hover:bg-white group-hover:text-black transition-all duration-200">Trust</button>
                           </div>
                             <p data-aos="zoom-in" className="text-white font-bold">Your trust is paramount, and we work tirelessly to maintain it.</p>
                             <div className="absolute inset-0 bg-black/30 z-[-10]"/>
                       </div>

                   </div>

                   {/* Value 4 */}

                  <div data-aos="fade-up" className="flex flex-col p-8  justify-between h-80 lg:h-[48%]  rounded-lg  group relative ">
                    <img src={homeassets.value4} alt="" className="absolute inset-0 w-full h-full object-cover rounded-lg z-[-10]"/>
                    <div>
                      <button data-aos="zoom-out" className="border-white border-2 rounded-full px-10 py-4 text-white font-bold group-hover:bg-white group-hover:text-black transition-all duration-200">Community</button>
                    </div>
                      <p data-aos="zoom-in" className="text-white font-bold">We're proud to be a part of the local pet-loving community, supporting pet owners like you.</p>
                      <div className="absolute inset-0 bg-black/30 z-[-10]"/>
                  </div>

            </div>

            </div>
        </section>
    )
}

export default Values;