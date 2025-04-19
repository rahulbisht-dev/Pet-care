import { useNavigate } from "react-router-dom";
import { useGetallproductsQuery } from "../../store/Api/Api";
import { useEffect, useState } from "react";
import { IoPawSharp } from "react-icons/io5";
import { Loader } from "../../components/Loader";
import { NoData } from "../../components/noData";
import { IoFilterOutline } from "react-icons/io5";
import { assets } from "../../assets/frontend_assets/assets";

export const Shop = () => {
  const [products, setproducts] = useState("");
  const [filter, setfilter] = useState({ pet: "", category: "" });
  const Navigate = useNavigate();
  const { data, isLoading } = useGetallproductsQuery();
  const [openFilter, setopenfilter] = useState(false);



  useEffect(() => {
    if (data && data.success) {
      setproducts(data.data);
    }
  }, [data]);

  const filteredData =
    products &&
    products?.filter((product) => {
      const matchPet =
        filter.pet === "" ||
        product.pet.toLowerCase().includes(filter.pet.toLowerCase());
      const matchCategory =
        filter.category === "" ||
        product.category.toLowerCase().includes(filter.category.toLowerCase());

      return matchPet && matchCategory;
    });

  const handlefilter = () => {
    setopenfilter(!openFilter);
  };


  if (isLoading) return <Loader />;
  if (!products) return <NoData message={"No Products Available"} description={"Oops! No products are available at the moment. Stay tuned for updates!"} buttonText={"Back to Home Page"} onClick={()=>Navigate("/")} imageUrl={assets.no_data}/>;

  return (
    data && (
      <section className="flex flex-col gap-8">
        {/* Shop Banner */}
        <div className="md:h-[30vh] lg:h-[50vh] h-[20vh]  w-full bg-[#c2a79a] flex items-center justify-center">
          <div>
            <h1
              data-aos="zoom-in"
              className="lg:text-7xl font-bold text-white text-4xl"
            >
              Shop For Your Pets
            </h1>
          </div>
        </div>

        <div className="md:hidden bg-white sticky top-0 w-full z-50 space-y-2">
          <button
            className="w-20 flex items-center gap-1 shadow-lg "
            onClick={() => handlefilter()}
          >
            <IoFilterOutline className="text-2xl text-neutral-5." />
            Filter
          </button>
        </div>

        {/* shop container */}

        <div className="flex w-full min-h-screen">
          {/* left filter */}

          <div
            className={`w-full max-w-[300px] px-4 lg:px-8 ${
              openFilter ? "block" : "hidden md:block"
            }`}
          >
            <div className="sticky top-0 z-40 bg-white p-4 shadow-md rounded-md flex flex-col gap-12">
              {/* PET FILTER */}
              <div className="flex flex-col gap-4">
                <div className="border-b border-gray-500 py-2">
                  <h1 className="text-2xl font-bold">Pet</h1>
                </div>

                <div className="flex flex-col gap-3 text-xs">
                  {["", "cat", "dog", "birds", "Aquatic Pets", "others"].map(
                    (petType, index) => (
                      <div className="flex gap-2" key={index}>
                        <input
                          type="radio"
                          value={petType}
                          name="pet"
                          onChange={(e) =>
                            setfilter({ ...filter, pet: e.target.value })
                          }
                        />
                        <h1 className="text-xs lg:text-[16px]">{petType === "" ? "All" : petType}</h1>
                      </div>
                    )
                  )}
                </div>
              </div>

              {/* CATEGORY FILTER */}
              <div className="flex flex-col gap-4">
                <div className="border-b border-gray-500 py-2">
                  <h1 className="text-2xl font-bold">Category</h1>
                </div>

                <div className="flex flex-col gap-3 text-xs lg:text-[16px]">
                  {[
                    ["", "All"],
                    ["Food & Treats", "Food & Treats"],
                    ["Clothing & Grooming", "Clothing & Grooming"],
                    ["Toys & Accessories", "Toys & Accessories"],
                    ["Beds & Furniture", "Beds & Furniture"],
                  ].map(([value, label], index) => (
                    <div className="flex gap-2" key={index}>
                      <input
                        type="radio"
                        value={value}
                        name="category"
                        onChange={(e) =>
                          setfilter({ ...filter, category: e.target.value })
                        }
                      />
                      <h1>{label}</h1>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          {/* right container */}

          <div className="border-grey w-full lg:p-8 md:p-4 p-2 relative ">
            <div className="flex flex-wrap gap-8 justify-around">
              {filteredData && filteredData.length !== 0 ? (
                filteredData.map((product, index) => {
                  return (
                    <div
                      key={index}
                      className="rounded-t-full w-30 md:w-50 lg:w-70 shadow-lg flex flex-col md:gap-4 gap-1  group"
                    >
                      <div className="w-full">
                        <img
                          src={product.image}
                          alt=""
                          className="rounded-t-full object-cover group-hover:scale-103 transition-all duration-300"
                        />
                      </div>
                      <div className="flex flex-col md:gap-2 px-2 text-xs md:text-[16px]">
                        <p className="text-gray-700">
                          <span className="font-bold">Name :-</span>{" "}
                          {product.name}
                        </p>
                        <p className="text-gray-700">
                          <span className="font-bold">Price :-</span> $
                          {product.price}
                        </p>
                        <p className="text-gray-700">
                          <span className="font-bold">Brand:- </span>
                          {product.brand}
                        </p>
                        <p className="text-gray-700">
                          <span className="font-bold">Pet :- </span>
                          {product.pet}
                        </p>
                        <p className="text-gray-700">
                          {product.stock ? (
                            <span className="text-green-500">In Stock</span>
                          ) : (
                            "Out Of Stock"
                          )}
                        </p>
                      </div>

                      <div className="mx-auto md:py-2">
                        <button
                          onClick={() => Navigate(`/shop/${product._id}`)}
                          className="px-8 md:py-2 py-1 bg-[#c2a79a] rounded-full group flex items-center gap-2 group-hover:text-white"
                        >
                          Buy{" "}
                          <IoPawSharp className="hidden group-hover:flex w-5 text-white" />{" "}
                        </button>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="text-2xl text-neutral-800">
                  NO PRODUCTS AVAILABLE
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    )
  );
};
