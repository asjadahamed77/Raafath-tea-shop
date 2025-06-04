import React, { useState, useMemo } from "react";
import searchIcon from "../assets/icons/search-icon.png";
import cakeImage from "../assets/box/cake.png";
import closeIcon from "../assets/icons/close.png";
import imageUploadIcon from "../assets/icons/image-upload.png";
import { RxCross2 } from "react-icons/rx";

const allCakes = [
  // same static cakes list as before...
  {
    id: "001",
    cakeName: "Chocolate Cake",
    cakePrice: "2000",
    cakeImage,
    category: "cup cake",
  },
  {
    id: "002",
    cakeName: "Vanilla Delight",
    cakePrice: "2000",
    cakeImage,
    category: "bento cake",
  },
  {
    id: "003",
    cakeName: "Strawberry Layer",
    cakePrice: "2000",
    cakeImage,
    category: "layer cake",
  },
  {
    id: "004",
    cakeName: "Fruit Jar",
    cakePrice: "2000",
    cakeImage,
    category: "jar cake",
  },
  {
    id: "005",
    cakeName: "Mini Cupcake",
    cakePrice: "2000",
    cakeImage,
    category: "cup cake",
  },
  {
    id: "006",
    cakeName: "Nutty Jar",
    cakePrice: "2000",
    cakeImage,
    category: "jar cake",
  },
  {
    id: "007",
    cakeName: "Butter Layer",
    cakePrice: "2000",
    cakeImage,
    category: "layer cake",
  },
  {
    id: "008",
    cakeName: "Bento Strawberry",
    cakePrice: "2000",
    cakeImage,
    category: "bento cake",
  },
  {
    id: "009",
    cakeName: "Deluxe Layer",
    cakePrice: "2000",
    cakeImage,
    category: "layer cake",
  },
  {
    id: "010",
    cakeName: "Classic Jar",
    cakePrice: "2000",
    cakeImage,
    category: "jar cake",
  },
  {
    id: "011",
    cakeName: "Rainbow Cup",
    cakePrice: "2000",
    cakeImage,
    category: "cup cake",
  },
  {
    id: "012",
    cakeName: "Mango Jar",
    cakePrice: "2000",
    cakeImage,
    category: "jar cake",
  },
  {
    id: "013",
    cakeName: "Triple Layer",
    cakePrice: "2000",
    cakeImage,
    category: "layer cake",
  },
  {
    id: "014",
    cakeName: "Bento Love",
    cakePrice: "2000",
    cakeImage,
    category: "bento cake",
  },
];

const CakeItems = () => {
  const [search, setSearch] = useState("");
  const [itemsPerPage, setItemsPerPage] = useState(4);
  const [currentPage, setCurrentPage] = useState(1);
  const [showPopup, setShowPopup] = useState(false);

  const [cakeName, setCakeName] = useState("");
  const [cakePrice, setCakePrice] = useState("");

  const [cakeImagePreview, setCakeImagePreview] = useState(null);
  const [cakeImageFile, setCakeImageFile] = useState(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCakeImagePreview(URL.createObjectURL(file));
      setCakeImageFile(file);
    }
  };

  const removeImage = () => {
    setCakeImagePreview(null);
    setCakeImageFile(null);
  };

  // Filtered by search
  const filteredCakes = useMemo(() => {
    return allCakes.filter((cake) =>
      cake.cakeName.toLowerCase().includes(search.toLowerCase())
    );
  }, [search]);

  const totalPages = Math.ceil(filteredCakes.length / itemsPerPage);

  const currentItems = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredCakes.slice(start, start + itemsPerPage);
  }, [filteredCakes, currentPage, itemsPerPage]);

  const handlePageChange = (dir) => {
    if (dir === "prev" && currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    } else if (dir === "next" && currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  return (
    <div className="">
      <h1 className="text-[26px] font-[500]">Cake Items</h1>

      {/* Search and Add Item */}
      <div className="flex items-center justify-between mt-[20px]">
        {/* Search */}
        <div className="flex items-center gap-[15px] sm:py-[15px] py-[12px] px-[20px] sm:w-[350px] w-[250px] border-[1px] border-primaryColor/50 rounded-[6px]">
          <img
            src={searchIcon}
            alt="search"
            className="sm:w-[20px] sm:h-[20px] w-[16px]"
          />
          <input
            type="text"
            className="w-full focus:outline-0 placeholder:text-primaryColor"
            placeholder="Search by name"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>

        <button
          onClick={() => setShowPopup(true)}
          className="text-sm sm:text-[18px] bg-primaryColor text-secondaryColor py-[15px] px-[20px] font-light rounded-[8px] hover:opacity-75 duration-300 transition-opacity cursor-pointer"
        >
         + Add new
        </button>
      </div>

      {/* Cake List */}
      <div className="grid xl:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-[30px] mt-12">
        {currentItems.map((item) => (
          <div
            key={item.id}
            className="text-center flex flex-col items-center border-[1px] border-primaryColor/50 rounded-[15px] py-[20px] px-[65px]"
          >
            <img
              src={item.cakeImage}
              alt={item.cakeName}
              className="w-[148px] h-[180px]"
            />
            <p className="text-[20px] font-[500] mt-4">{item.cakeName}</p>
            <p className="text-[20px] font-[500]">Rs. {item.cakePrice}</p>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between mt-[30px] flex-wrap gap-4">
        {/* Items per page */}
        <div className="flex items-center gap-[20px]">
          <p className="text-[18px] font-light">Items per page</p>
          <select
            className="rounded-[6px] py-[8px] px-[15px] border border-primaryColor/50 focus:outline-0"
            value={itemsPerPage}
            onChange={(e) => {
              setItemsPerPage(Number(e.target.value));
              setCurrentPage(1); // Reset to first page
            }}
          >
            <option value="4">4</option>
            <option value="8">8</option>
            <option value="12">12</option>
            <option value="16">16</option>
          </select>
        </div>

        {/* Page navigation */}
        <div className="flex items-center gap-[15px]">
          <button
            onClick={() => handlePageChange("prev")}
            disabled={currentPage === 1}
            className="rounded-[4px] border border-primaryColor/50 py-[8px] px-[14px] aspect-square cursor-pointer hover:opacity-75 duration-300 disabled:opacity-40"
          >
            {"<"}
          </button>
          <p className="text-[18px] font-light">
            Page {currentPage} of {totalPages || 1}
          </p>
          <button
            onClick={() => handlePageChange("next")}
            disabled={currentPage === totalPages}
            className="rounded-[4px] border border-primaryColor/50 py-[8px] px-[14px] aspect-square cursor-pointer hover:opacity-75 duration-300 disabled:opacity-40"
          >
            {">"}
          </button>
        </div>
      </div>
      {/* Add item overlay */}
      {showPopup && (
        <div
          className={`fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-6 sm:px-0 `}
        >
          <div className="sm:w-[460px] py-[25px] bg-secondaryColor rounded-[12px] w-full">
            <div className="flex items-center justify-between  border-b p-[25px] pt-0">
              <h1 className="font-[500] text-[20px]">Add New Cake</h1>
              <img
                onClick={() => setShowPopup(false)}
                src={closeIcon}
                alt="close"
                className="w-[15px]"
              />
            </div>
            <form className="w-full px-[20px] flex flex-col gap-[15px] mt-8">
              <div className="w-full flex flex-col gap-[15px]">
                <p className="text-[18px] font-[500]">Cake Name</p>
                <input
                  type="text"
                  placeholder="Enter the cake name"
                  value={cakeName}
                  onChange={(e) => setCakeName(e.target.value)}
                  required
                  className="py-[15px] px-[20px] w-full rounded-[6px] border border-primaryColor/50 focus:outline-none focus:ring-2 focus:ring-primaryColor focus:ring-offset-1 transition duration-150 ease-in-out"
                />
              </div>
              <div className="w-full flex flex-col gap-[15px]">
                <p className="text-[18px] font-[500]">Price</p>
                <input
                  type="number"
                  placeholder="Enter the cake price"
                  value={cakePrice}
                  onChange={(e) => setCakePrice(e.target.value)}
                  required
                  className="py-[15px] px-[20px] w-full rounded-[6px] border border-primaryColor/50 focus:outline-none focus:ring-2 focus:ring-primaryColor focus:ring-offset-1 transition duration-150 ease-in-out"
                />
              </div>
              <div className="w-full flex flex-col gap-[15px]">
                <p className="text-[18px] font-[500]">Add an image</p>

                {/* Upload Trigger */}
                <div
                  onClick={() =>
                    document.getElementById("cakeImageInput").click()
                  }
                  className="relative flex flex-col justify-center items-center py-[30px] px-[20px] border border-dashed rounded-[6px] cursor-pointer hover:bg-gray-50 transition"
                >
                  {cakeImagePreview ? (
                    <div className="relative">
                      <img
                        src={cakeImagePreview}
                        alt="Cake Preview"
                        className="w-[120px] h-[120px] object-cover rounded-[8px]"
                      />
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          removeImage();
                        }}
                        className="absolute -top-2 -right-2 bg-white p-1 rounded-full shadow"
                      >
                        <RxCross2 className="text-red-500" size={18} />
                      </button>
                    </div>
                  ) : (
                    <>
                      <img
                        src={imageUploadIcon}
                        alt="Upload Image"
                        className="w-[24px] h-[24px]"
                      />
                      <p className="mt-[10px]">Upload File</p>
                    </>
                  )}
                </div>

                {/* Hidden Input */}
                <input
                  type="file"
                  id="cakeImageInput"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  required
                />
              </div>

              <button className="w-full py-[15px] text-[18px] font-light bg-primaryColor text-secondaryColor rounded-[8px] mt-8 cursor-pointer hover:opacity-75 duration-300 transition-opacity">
                Add Item
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CakeItems;
