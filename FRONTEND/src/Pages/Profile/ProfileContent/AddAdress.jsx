import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineDelete } from "react-icons/ai";
import { RxCross1 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { Country, State } from "country-state-city";
import { toast, ToastContainer } from "react-toastify";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import Swal from "sweetalert2";
import { addNewAddress, removeAddress } from "../../../Redux/Slice/UserSlice";
const AddAdress = () => {
  const { user } = useSelector((store) => store.user);
  const [open, setOpen] = useState(false);
  const [country, setCountry] = useState("");
  const axiosPublic = useAxiosPublic();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const addressTypeData = [
    {
      name: "Default",
    },
    {
      name: "Home",
    },
    {
      name: "Office",
    },
  ];

  const onSubmitHandle = (data) => {
    if (addressTypeData == "" || data.country == "" || data.city == "") {
      toast.error("Please fill all the fields!");
    }

    const newAddress = {
      country: data.country,
      city: data.city,
      zipCode: data.zipCode,
      address1: data.address1,
      address2: data.address2,
      addressType: data.addressType,
    };
    Swal.fire({
      title: "Are you sure?",
      text: "Add New Address",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosPublic
          .put(`/user/update-address`, newAddress, { withCredentials: true })
          .then((res) => {
            if (res.data.success === true) {
              dispatch(addNewAddress(res?.data?.user.addresses.slice(-1)[0]));
              Swal.fire({
                title: "Done",
                text: "Add New Address SuccesFull!",
                icon: "success",
              });
              setOpen(false);
              reset();
              setCountry("");
              // window.location.reload(true);
            }
          })
          .catch((error) => {
            return toast.error(error.response.data.message);
          });
      }
    });
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Delete This Address",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosPublic
          .delete(`/user/delete-address/${id}`, { withCredentials: true })
          .then((res) => {
            if (res.data.success === true) {
              dispatch(removeAddress(id));
              Swal.fire({
                text: "Delete Address SuccesFull!",
                icon: "success",
              });

              // window.location.reload(true);
            }
          })
          .catch((error) => {
            return toast.error(error.response.data.message);
          });
      }
    });
  };

  return (
    <div className="px-5">
      <ToastContainer />
      {open && (
        <div className="fixed bg-[#0000004b] w-full h-screen top-0 left-0 flex items-center justify-center">
          <div className="md:w-[35%] w-[60%] h-[80vh]  bg-white rounded shadow relative overflow-y-scroll">
            {" "}
            <div className="flex justify-end w-full p-3">
              <RxCross1
                size={30}
                className="cursor-pointer"
                onClick={() => setOpen(false)}
              />
            </div>
            <h1 className="text-center text-[25px] font-Poppins">
              Add New Address
            </h1>
            {/* ------From-Start-Here------ */}
            <div>
              <form
                onSubmit={handleSubmit(onSubmitHandle)}
                aria-required="true"
              >
                <div className="block w-full p-4">
                  <div className="block p-2">
                    {" "}
                    <label className="block pb-2" htmlFor="country">
                      Choose Your Country
                    </label>
                    <select
                      {...register("country", {
                        required: "Please fill Country field",
                      })}
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      className="w-[95%] border h-[40px] rounded-[5px]"
                      id="country"
                    >
                      {" "}
                      <option
                        value=""
                        defaultChecked
                        className="block pb-2 border"
                      >
                        choose your country
                      </option>
                      {Country.getAllCountries().map((item, index) => {
                        return (
                          <option
                            value={item.isoCode}
                            key={index}
                            className="block pb-2 border"
                          >
                            {item.name}
                          </option>
                        );
                      })}
                    </select>{" "}
                  </div>
                  <div className="block p-2">
                    <label className="block pb-2" htmlFor="city">
                      Choose Your City
                    </label>
                    <select
                      {...register("city")}
                      className="w-[95%] border h-[40px] rounded-[5px]"
                      id="city"
                    >
                      <option
                        value=""
                        defaultChecked
                        className="block pb-2 border"
                      >
                        choose your City
                      </option>
                      {State.getStatesOfCountry(country).map((item, index) => {
                        return (
                          <option
                            value={item.isoCode}
                            key={index}
                            className="block pb-2 border"
                          >
                            {item.name}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                  <div className="w-full pb-2">
                    <label className="block pb-2" htmlFor="address1">
                      Address 1
                    </label>
                    <input
                      type="text"
                      id="address1"
                      className="formInput"
                      {...register("address1")}
                    />
                  </div>
                  <div className="w-full pb-2">
                    <label className="block pb-2" htmlFor="address2">
                      Address 2
                    </label>
                    <input
                      type="text"
                      id="address2"
                      className="formInput"
                      {...register("address2")}
                    />
                  </div>
                  <div className="w-full pb-2">
                    <label className="block pb-2" htmlFor="zipcode">
                      Zip Code
                    </label>
                    <input
                      type="number"
                      id="zipcode"
                      className="formInput"
                      {...register("zipCode")}
                    />
                  </div>
                  <div className="w-full pb-2">
                    <label className="block pb-2">Address Type</label>
                    <select
                      className="w-[95%] border h-[40px] rounded-[5px]"
                      {...register("addressType")}
                    >
                      <option className="block pb-2 border" defaultChecked>
                        Choose your Address Type
                      </option>
                      {addressTypeData.map((item, index) => {
                        return (
                          <option key={index} className="block p-2">
                            {item.name}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                  <button
                    type="sumbit"
                    className="mt-5 duration-300 cursor-pointer formInput hover:bg-cyan-400 hover:text-white"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
      <div className="flex items-center justify-between">
        <h1 className="text-[25px] font-[600] text-[#000000ba] pb-2">
          My Addresses
        </h1>
        <button
          onClick={() => setOpen(true)}
          className="btn text-white !rounded-md"
        >
          Add New
        </button>
      </div>
      <br />
      {user && user?.addresses?.length !== 0 && (
        <div>
          {user?.addresses?.map((item, index) => {
            return (
              <div
                key={index}
                className="min-w-full bg-white h-min md:h-[70px] rounded-[4px]  px-3 flex items-center justify-between shadow pr-10 mb-5"
              >
                <h5 className="pl-5 font-[600] ">{item?.addressType}</h5>
                <h6 className="text-[12px] md:text-[15px] pl-8">
                  {item?.address1},{item?.address2}
                  {item?.city},{item?.country}
                </h6>
                <h6 className="text-[12px] md:text-[15px] pl-8">
                  {item?.zipCode}
                </h6>
                <div className="pl-8 ">
                  <AiOutlineDelete
                    className="cursor-pointer"
                    size={25}
                    onClick={() => handleDelete(item._id)}
                  />
                </div>
              </div>
            );
          })}
        </div>
      )}
      {user && user?.addresses?.length === 0 && (
        <h5 className="min-w-full bg-white h-min md:h-[70px] rounded-[4px]  px-3 flex items-center justify-center shadow pr-10 mb-5 text-2xl uppercase font-bold ">
          Address Is Empty
        </h5>
      )}
    </div>
  );
};

export default AddAdress;
