import { homeassets } from "../../assets/frontend_assets/home/assets";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';


export const Testimonials = () =>{





    const testimonials = [

        {
            name:"Lorem E",
            review:"Petcare exceeded my expectations.Their pet sitting service was truly exceptional.Thanks to their dedicaed care and attention",
            image:homeassets.testimonial1
        },

        {
            name:"Epsum D",
            review:"Petcare exceeded my expectations.Their pet sitting service was truly exceptional.Thanks to their dedicaed care and attention",
            image:homeassets.testimonial2
        },

        {
            name:"Notor P",
            review:"Petcare exceeded my expectations.Their pet sitting service was truly exceptional.Thanks to their dedicaed care and attention",
            image:homeassets.testimonial3
        },
        {
            name:"Fiend L",
            review:"Petcare exceeded my expectations.Their pet sitting service was truly exceptional.Thanks to their dedicaed care and attention",
            image:homeassets.testimonial1
        },

    ]
    


    return(
        <section className="bg-white mt-16 lg:px-8 px-4 flex flex-col overflow-x-hidden">


            <div className="text-center mx-auto">
                <h1 className="font-bold text-5xl">Testimonials</h1>
                <div className="h-2 bg-[#c2a79a] w-full rounded-full mt-4"></div>
                <p className="mt-4 text-xl text-gray-600">Real Stories From Petcare Families</p>
            </div>


            <div className="w-full max-w-5xl mx-auto px-4 py-10">
                 <Swiper
                   modules={[Pagination, Autoplay]}
                   spaceBetween={30}
                   slidesPerView={1}
                   pagination={{ clickable: true }}
                   autoplay={{ delay: 3000 }}
                   breakpoints={{
                     640: { slidesPerView: 1 },
                     768: { slidesPerView: 2 },
                     1024: { slidesPerView: 3 },
                   }}
                 >
                  {testimonials.map((t, index) => (
                    <SwiperSlide key={index}>
                      <div className="bg-neutral-200 shadow-xl rounded-2xl p-6 h-full flex flex-col justify-between border-2 relative">
                        <div className="w-15 h-15  rounded-full  mx-auto">
                            <img src={t.image} alt="" className="rounded-full object-cover"/>
                        </div>
                        <p className="text-gray-700 text-lg mb-4"></p>
                        <div>
                          <h3 className="text-gray-700  mb-4">{t.review}</h3>
                          <p className="text-sm font-bold">{t.name}.</p>
                        </div>
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>

        </section>
    )
}