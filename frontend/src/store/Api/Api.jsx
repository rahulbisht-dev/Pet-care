import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react"


export const base_url = "https://petcare-l7rt.onrender.com";

const API_URL = {

    //$ user related urls
    signup:`${base_url}/user/signup`,
    login:`${base_url}/user/login`,
    getappointments:`${base_url}/user/getappointments`,
    cancelappointment:(id)=>`${base_url}/user/cancelappointment/${id}`,
    getallproducts:`${base_url}/user/getallproducts`,
    getuserdata:`${base_url}/user/`,
    updateuser:`${base_url}/user/updateuser`,
    logout:`${base_url}/user/logout`,


    //$ appointment related urls
    allappointments:`${base_url}/appointment/`,
    getselectedappointment:(id) => `${base_url}/appointment/${id}`,
    bookappointment:`${base_url}/appointment/bookappointment`,


    //$ order and cart related urls
    getproductdetails:(id) => `${base_url}/order/getproduct/${id}`,
    getcartitems:`${base_url}/order/getcartitems`,
    addtocart:`${base_url}/order/addtocart`,
    removefromcart:`${base_url}/order/removefromcart`,
    updatecartitems:`${base_url}/order/updatecartitems`,
    adduseraddress:`${base_url}/order/adduseraddress`,
    getuseraddress:`${base_url}/order/getuseraddress`,
    updateuseraddress:`${base_url}/order/updateuseraddress`,
    createorupdateorder:`${base_url}/order/createorupdateorder`,
    clearcart:`${base_url}/order/clearcart`,
    getuserorders:`${base_url}/order/getuserorders`,
    cancelorder:(id)=>`${base_url}/order/cancelorder/${id}`
}


export const Api = createApi({
    baseQuery:fetchBaseQuery({
        baseUrl:"https://petcare-l7rt.onrender.com",
        credentials:"include"
    }),
    tagTypes:["user" , "appointment" , "order"],
    endpoints:(builder) =>({


        signup:builder.mutation({
            query:(userdata)=>({
                url:API_URL.signup,
                method:"POST",
                body:userdata
            }),
            invalidatesTags:["user"]
        }),

        login:builder.mutation({
            query:(userdata)=>({
                url:API_URL.login,
                method:"POST",
                body:userdata
            }),
            invalidatesTags:["user"]

        }),

        allappointments:builder.query({
            query:() =>({
                url:API_URL.allappointments,
                method:"GET"
            }),
            providesTags:["user"]
        }),

        getselectedappointment:builder.query({
            query:(id)=>({
                url:API_URL.getselectedappointment(id),
                method:"GET"
            }),
            providesTags:["appointment"]
        }),

        bookappointment:builder.mutation({
            query:(data) =>({
                url:API_URL.bookappointment,
                method:"POST",
                body:data
            }),
            invalidatesTags:["appointment"]
        }),

        getuserappointments:builder.query({
            query:() =>({
                url:API_URL.getappointments,
                method:"GET"
            }),
            providesTags:["user"]
        }),

        getallproducts:builder.query({
            query:()=>({
                url:API_URL.getallproducts,
                method:"GET"
            }),
            providesTags:["user"]
        }),

        getproductdetails:builder.query({
            query:(id)=>({
                url:API_URL.getproductdetails(id),
                method:"GET"
            }),
            providesTags:["order"]
        }),

        addtocart:builder.mutation({
            query:(data)=>({
                url:API_URL.addtocart,
                method:"POST",
                body:data
            }),
            invalidatesTags:["order"]
        }),

        removefromcart:builder.mutation({
            query:(data)=>({
                url:API_URL.removefromcart,
                method:"POST",
                body:data
            }),
            invalidatesTags:["order"]
        }),

        getcartitems:builder.query({
            query:() =>({
                url:API_URL.getcartitems,
                method:"GET"
            }),
            providesTags:["order"]
        }),

        updatecartitems:builder.mutation({
            query:(data) =>({
                url:API_URL.updatecartitems,
                method:"POST",
                body:data
            }),
            invalidatesTags:["order"]
        }),

        adduseraddress:builder.mutation({
            query:(data) =>({
                url:API_URL.adduseraddress,
                method:"POST",
                body:data
            }),
            invalidatesTags:["order"]
        }),

        getuseraddress:builder.query({
            query:() =>({
                url:API_URL.getuseraddress,
                method:"GET"
            }),
            providesTags:["order"]
        }),

        updateuseraddress:builder.mutation({
            query:(data) =>({
                url:API_URL.updateuseraddress,
                method:"POST",
                body:data
            }),
            invalidatesTags:["order"]
        }),

        createorupdateorder:builder.mutation({
            query:(data) =>({
                url:API_URL.createorupdateorder,
                method:"POST",
                body:data
            }),
            invalidatesTags:["order"]
        }),

        clearcart:builder.mutation({
            query:()=>({
                url:API_URL.clearcart,
                method:"POST",
            }),
            invalidatesTags:["order"]
        }),


        logout:builder.mutation({
            query:()=>({
                url:API_URL.logout,
                method:"GET"
            }),

            invalidatesTags:["user"]
        }),

        getuserdata:builder.query({
            query:()=>({
                url:API_URL.getuserdata,
                method:"GET"
            }),
            providesTags:["user"]
        }),

        updateuser:builder.mutation({
            query:(data)=>({
                url:API_URL.updateuser,
                method:"POST",
                body:data
            }),
            invalidatesTags:["user"]
        }),

        cancelappointment:builder.mutation({
            query:(id)=>({
                url:API_URL.cancelappointment(id),
                method:"GET"
            }),
            invalidatesTags:["user"]
        }),

        getuserorders:builder.query({
            query:()=>({
                url:API_URL.getuserorders,
                method:"GET"
            }),
            providesTags:["order"]
        }),

        cancelorder:builder.mutation({
            query:(id) =>({
                url:API_URL.cancelorder(id),
                method:"POST"
            }),
            invalidatesTags:["order"]
        })






    })

})


export const {useLoginMutation , useSignupMutation , useAllappointmentsQuery , useGetselectedappointmentQuery ,
     useBookappointmentMutation , useGetuserappointmentsQuery , useGetallproductsQuery , useGetproductdetailsQuery , useAddtocartMutation ,
      useRemovefromcartMutation , useGetcartitemsQuery , useUpdatecartitemsMutation , useAdduseraddressMutation , 
      useGetuseraddressQuery , useUpdateuseraddressMutation , useCreateorupdateorderMutation , useClearcartMutation , useLogoutMutation ,
       useGetuserdataQuery , useUpdateuserMutation , useCancelappointmentMutation , useGetuserordersQuery , useCancelorderMutation} = Api;