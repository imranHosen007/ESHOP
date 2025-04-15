import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlinePlusCircle } from "react-icons/ai";
import Swal from "sweetalert2";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
const categoriesData = [
  {
    id: 1,
    title: "Computers and Laptops",
    subTitle: "",
    image_Url:
      "https://cdn.shopify.com/s/files/1/1706/9177/products/NEWAppleMacbookProwithM1ProChip14InchLaptop2021ModelMKGQ3LL_A_16GB_1TBSSD_custommacbd.jpg?v=1659592838",
  },
  {
    id: 2,
    title: "cosmetics and body care",
    subTitle: "",
    image_Url:
      "https://indian-retailer.s3.ap-south-1.amazonaws.com/s3fs-public/2021-07/kosme1.png",
  },
  {
    id: 3,
    title: "Accesories",
    subTitle: "",
    image_Url:
      "https://img.freepik.com/free-vector/ordering-goods-online-internet-store-online-shopping-niche-e-commerce-website-mother-buying-babies-clothes-footwear-toys-infant-accessories_335657-2345.jpg?w=2000",
  },
  {
    id: 4,
    title: "Cloths",
    subTitle: "",
    image_Url:
      "https://www.shift4shop.com/2015/images/industries/clothing/clothing-apparel.png",
  },
  {
    id: 5,
    title: "Shoes",
    subTitle: "",
    image_Url:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQvBQPQMVNRd6TtDkGs2dCri0Y-rxKkFOiEWw&usqp=CAU",
  },
  {
    id: 6,
    title: "Gifts",
    subTitle: "",
    image_Url:
      "https://securecdn.pymnts.com/wp-content/uploads/2014/11/Gifts-Photo-700x489.jpg",
  },
  {
    id: 7,
    title: "Pet Care",
    subTitle: "",
    image_Url: "https://cdn.openpr.com/T/c/Tc15444071_g.jpg",
  },
  {
    id: 8,
    title: "Mobile and Tablets",
    subTitle: "",
    image_Url:
      "https://st-troy.mncdn.com/mnresize/1500/1500/Content/media/ProductImg/original/mpwp3tua-apple-iphone-14-256gb-mavi-mpwp3tua-637986832343472449.jpg",
  },
  {
    id: 9,
    title: "Music and Gaming",
    subTitle: "",
    image_Url:
      "https://static.vecteezy.com/system/resources/previews/011/996/555/original/3d-black-headphone-illustration-ecommerce-icon-png.png",
  },
  {
    id: 10,
    title: "Others",
    subTitle: "",
    image_Url:
      "https://searchspring.com/wp-content/uploads/2022/10/Hero-Image-Platform-Others-2.png",
  },
];
const CreateEvent = () => {
  const navigate = useNavigate();
  const { seller } = useSelector(store => store.seller);
  const axiosPublic = useAxiosPublic();

  const [images, setImages] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState("");
  const [originalPrice, setOriginalPrice] = useState();
  const [discountPrice, setDiscountPrice] = useState();
  const [stock, setStock] = useState();
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const handleImageChange = e => {
    const files = Array.from(e.target.files);
    setImages([]);
    files.forEach(file => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImages(old => [...old, reader.result]);
        }
      };
      reader.readAsDataURL(file);
    });
  };
  const handleStartDate = e => {
    const startDate = new Date(e.target.value);
    setStartDate(startDate);
    setEndDate(null);
  };
  const today = new Date().toISOString().slice(0, 10);

  const minEndDate = startDate
    ? new Date(startDate.getTime() + 3 * 24 * 60 * 60 * 1000)
        .toISOString()
        .slice(0, 10)
    : "";

  const handleEndDate = e => {
    const endDate = new Date(e.target.value);
    setEndDate(endDate);
  };

  const handleSubmit = e => {
    e.preventDefault();

    const data = {
      name,
      description,
      category,
      tags,
      originalPrice,
      discountPrice,
      stock,
      images,
      shopId: seller._id,
      start_Date: startDate?.toISOString(),
      Finish_Date: endDate?.toISOString(),
    };
    axiosPublic
      .post(
        `/event`,
        data,
        {
          withCredentials: true,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then(res => {
        if (res.data.success === true) {
          Swal.fire({
            title: "Event Added SuccesFull!",
            icon: "success",
          });

          navigate(`/dashboard/event`);
        }
      })
      .catch(error => toast.error(error.response.data.message));
  };
  return (
    <div className="flex justify-center p-3 ">
      <div className="w-[90%] md:w-[50%] bg-white  shadow h-[80vh] rounded-[4px] overflow-y-scroll p-3">
        <h5 className="text-[30px] font-Poppins text-center">Create Event</h5>
        <form onSubmit={handleSubmit}>
          {/* -----Name-col----- */}
          <div className="pb-3">
            <label className="block pb-1" htmlFor="name">
              Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="name"
              value={name}
              className="crateInput"
              onChange={e => setName(e.target.value)}
              placeholder="Enter your product name..."
              required
            />
          </div>
          {/* -- Description-Col-- */}{" "}
          <div className="pb-3">
            <label className="block pb-1" htmlFor="description">
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              type="text"
              name="description"
              value={description}
              className="mt-2 appearance-none block w-full pt-2 px-3 border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              onChange={e => setDescription(e.target.value)}
              placeholder="Enter your product description..."
              required
              rows="8 "
              cols="30"
            ></textarea>
          </div>{" "}
          {/* -- Category-Col-- */}{" "}
          <div className="pb-3">
            <label className="block pb-1" htmlFor="category">
              Category<span className="text-red-500">*</span>
            </label>
            <select
              className="w-full mt-2 border h-[35px] rounded-[5px]"
              id="category"
              required
              value={category}
              onChange={e => setCategory(e.target.value)}
            >
              <option defaultChecked>Choose a category</option>
              {categoriesData &&
                categoriesData.map((item, index) => {
                  return (
                    <option value={item.title} key={index}>
                      {item.title}
                    </option>
                  );
                })}
            </select>
          </div>
          {/* ----Tag-Col---- */}
          <div className="pb-3">
            <label className="block pb-1" htmlFor="tags">
              Tags
            </label>
            <input
              id="tags"
              name="name"
              type="text"
              value={tags}
              className="crateInput"
              onChange={e => setTags(e.target.value)}
              placeholder="Enter your product tags..."
            />
          </div>{" "}
          {/* ----Orginal-Price-Col---- */}
          <div className="pb-3">
            <label className="block pb-1" htmlFor="originalPrice">
              Original Price
            </label>
            <input
              id="originalPrice"
              type="number"
              value={originalPrice}
              className="crateInput"
              onChange={e => setOriginalPrice(e.target.value)}
              placeholder="Enter your product price..."
            />
          </div>{" "}
          {/* ----Discount-Price-Col---- */}
          <div className="pb-3">
            <label className="block pb-1" htmlFor="discountprice">
              Price (With Discount)<span className="text-red-500">*</span>
            </label>
            <input
              id="discountprice"
              name="discountprice"
              type="number"
              value={discountPrice}
              required
              className="crateInput"
              onChange={e => setDiscountPrice(e.target.value)}
              placeholder="Enter your product price with discount..."
            />
          </div>{" "}
          {/* ----Product-Stock-Col---- */}
          <div className="pb-3">
            <label className="block pb-1" htmlFor="stock">
              Product Stock<span className="text-red-500">*</span>
            </label>
            <input
              id="stock"
              name="stock"
              type="number"
              value={stock}
              required
              className="crateInput"
              onChange={e => setStock(e.target.value)}
              placeholder="Enter your product price with discount..."
            />
          </div>{" "}
          {/* ----Product-Start---- */}
          <div className="pb-3">
            <label className="block pb-1" htmlFor="startdate">
              Event Start Date<span className="text-red-500">*</span>
            </label>
            <input
              id="startdate"
              name="startdate"
              type="date"
              required
              className="crateInput"
              onChange={handleStartDate}
              value={startDate ? startDate.toISOString().slice(0, 10) : ""}
              placeholder="Enter your event product stock..."
              min={today}
            />
          </div>{" "}
          {/* -----End-Date----- */}
          <div className="pb-3">
            <label className="block pb-1" htmlFor="enddata">
              Event End Date<span className="text-red-500">*</span>
            </label>
            <input
              id="enddata"
              name="enddata"
              type="date"
              required
              className="crateInput"
              onChange={handleEndDate}
              value={endDate ? endDate.toISOString().slice(0, 10) : ""}
              placeholder="Enter your event product stock..."
              min={minEndDate}
            />
          </div>
          {/* ----Product-Image-Col---- */}
          <div className="pb-3">
            <label className="block pb-1" htmlFor="image">
              Upload Images<span className="text-red-500">*</span>
            </label>
            <input
              id="image"
              name="image"
              type="file"
              className="hidden"
              multiple
              onChange={handleImageChange}
            />
            <div className="flex flex-wrap items-center w-full">
              <label htmlFor="image">
                <AiOutlinePlusCircle size={30} className="mt-3" color="#555" />
              </label>
              {images &&
                images.map((item, index) => {
                  return (
                    <img
                      src={item}
                      key={index}
                      alt=""
                      className="h-[120px] w-[120px] object-cover m-2"
                    />
                  );
                })}
            </div>
          </div>
          <div>
            <button className="crateInput" type="submit">
              Create
            </button>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default CreateEvent;
