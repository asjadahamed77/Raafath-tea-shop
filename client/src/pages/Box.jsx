import React, { useState } from "react";
import boxImage from "../assets/box/box.png";
import cakeImage from "../assets/box/cake.png";

const Box = () => {
  const [chooseCake, setChooseCake] = useState(true);
  const [chooseBox, setChooseBox] = useState(false);
  const box = [
    {
      id: "001",
      boxName: "Box Name",
      boxPrice: "LKR 1000",
      boxImage: boxImage,
    },
    {
      id: "002",
      boxName: "Box Name",
      boxPrice: "LKR 1000",
      boxImage: boxImage,
    },
    {
      id: "003",
      boxName: "Box Name",
      boxPrice: "LKR 1000",
      boxImage: boxImage,
    },
    {
      id: "004",
      boxName: "Box Name",
      boxPrice: "LKR 1000",
      boxImage: boxImage,
    },
    {
      id: "005",
      boxName: "Box Name",
      boxPrice: "LKR 1000",
      boxImage: boxImage,
    },
    {
      id: "006",
      boxName: "Box Name",
      boxPrice: "LKR 1000",
      boxImage: boxImage,
    },
  ];

  const cakes = [
    {
      id: "001",
      cakeName: "Cake Name",
      cakePrice: "LKR 2000",
      cakeImage: cakeImage,
      category: "cup cake",
    },
    {
      id: "002",
      cakeName: "Cake Name",
      cakePrice: "LKR 2000",
      cakeImage: cakeImage,
      category: "bento cake",
    },
    {
      id: "003",
      cakeName: "Cake Name",
      cakePrice: "LKR 2000",
      cakeImage: cakeImage,
      category: "layer cake",
    },
    {
      id: "004",
      cakeName: "Cake Name",
      cakePrice: "LKR 2000",
      cakeImage: cakeImage,
      category: "jar cake",
    },
    {
      id: "005",
      cakeName: "Cake Name",
      cakePrice: "LKR 2000",
      cakeImage: cakeImage,
      category: "cup cake",
    },
    {
      id: "006",
      cakeName: "Cake Name",
      cakePrice: "LKR 2000",
      cakeImage: cakeImage,
      category: "jar cake",
    },
    {
      id: "007",
      cakeName: "Cake Name",
      cakePrice: "LKR 2000",
      cakeImage: cakeImage,
      category: "layer cake",
    },
    {
      id: "008",
      cakeName: "Cake Name",
      cakePrice: "LKR 2000",
      cakeImage: cakeImage,
      category: "bento cake",
    },
  ];

  const uniqueCategories = [...new Set(cakes.map((cake) => cake.category))];

  const handleNext = () => {
    setChooseCake(false);
    setChooseBox(true);
  };

  const handleBack = () => {
    setChooseCake(true);
    setChooseBox(false);
  };

  const [filteredCategory, setFilteredCategory] = useState("all");
  const displayedCakes =
    filteredCategory === "all"
      ? cakes
      : cakes.filter((cake) => cake.category === filteredCategory);

  const [selectedCakes, setSelectedCakes] = useState([]);
  const [boxSelected, setBoxSelected] = useState(null);

  const toggleCakeSelection = (id) => {
    if (selectedCakes.includes(id)) {
      setSelectedCakes(selectedCakes.filter((cakeId) => cakeId !== id));
    } else {
      setSelectedCakes([...selectedCakes, id]);
    }
  };
  const handleBoxSelect = (index) => {
    setBoxSelected(index);
  };

  return (
    <div className="xl:px-[120px] lg:px-[40px] md:px-[20px] sm:px-[16px] px-4 py-20 flex flex-col  ">
      {chooseCake && (
        <>
          <div className="flex flex-col items-center">
            <h1 className="text-center font-[400] text-[45px] leading-12 sm:text-[60px] font-volgue my-12">
              Pick a Cake
            </h1>
            <p className="w-[80%] text-center font-light leading-6 mt-[-30px] text-[18px]">
              From cute bento cakes to celebration-sized classics, explore a
              variety of flavors, shapes, and styles. Whether it’s a birthday, a
              surprise, or just a sweet craving, we’ve got something freshly
              baked for you.
            </p>
          </div>
          <div className="flex flex-wrap items-center  md:gap-[20px] gap-4 mt-12 md:px-12  ">
            <button
              onClick={() => setFilteredCategory("all")}
              className={`md:py-[16px] md:px-[35px] px-8 py-2 text-sm md:text-base rounded-full  ${
                filteredCategory === "all"
                  ? "bg-primaryColor text-secondaryColor"
                  : "bg-transparent border-[2px]"
              }`}
            >
              All
            </button>
            {uniqueCategories.map((item, index) => (
              <button
                key={index}
                onClick={() => setFilteredCategory(item)}
                className={`md:py-[16px] md:px-[35px] px-8 py-2 text-sm md:text-base rounded-full  ${
                  filteredCategory === item
                    ? "bg-primaryColor text-secondaryColor"
                    : "bg-transparent border-[2px]"
                }`}
              >
                {item}
              </button>
            ))}
          </div>
          <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-12 my-20 place-items-center w-fit text-center mx-auto ">
            {displayedCakes.map((item, index) => (
              <div
                key={index}
                className={`lg:w-[370px] h-[525px]  items-center  py-[50px] px-[75px] rounded-[30px] shadow-[4px_4px_14px_0]/30 hover:shadow-[4px_4px_14px_0]/70 cursor-pointer flex flex-col gap-[30px] `}
              >
                <div className="w-[215px] h-[262px]">
                  <img
                    src={item.cakeImage}
                    alt={item.cakeName}
                    className="w-full h-full  aspect-square "
                  />
                </div>
                <div className="flex flex-col gap-[8px]">
                  <p className="text-[18px] font-[500]">{item.cakeName}</p>
                  <p className="text-[18px] font-[500]">{item.cakePrice}</p>
                </div>
                <button
                  onClick={() => toggleCakeSelection(item.id)}
                  className={`w-fit py-[16px] px-[58px] rounded-full font-light border-[2px] text-[18px] transition-colors duration-300 ${
                    selectedCakes.includes(item.id)
                      ? "bg-primaryColor text-secondaryColor"
                      : "hover:bg-primaryColor hover:text-secondaryColor"
                  }`}
                >
                  {selectedCakes.includes(item.id) ? "Added" : "Add to Box"}
                </button>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-between">
            <button
              onClick={handleBack}
              className="text-sm md:text-base py-[15px] px-[40px] bg-transparent rounded-full border-[2px] font-light hover:opacity-75 duration-300 transition-opacity cursor-pointer"
            >
              Back
            </button>
            <button
              onClick={handleNext}
              className="text-sm md:text-base py-[15px] px-[40px] bg-primaryColor text-secondaryColor rounded-full border-[2px] font-light hover:opacity-75 duration-300 transition-opacity cursor-pointer"
            >
              Next
            </button>
          </div>
        </>
      )}

      {chooseBox && (
        <>
          <div className="flex flex-col items-center">
            <h1 className="text-center font-[400] text-[45px] leading-12 sm:text-[60px] font-volgue my-12">
              Choose your Box
            </h1>
            <p className="w-[80%] text-center font-light leading-6 mt-[-30px] text-[18px]">
              Choose from our stylish and elegant boxes, each handmade to
              enhance the unboxing experience and make your gift look extra
              special. Every single box is crafted with attention to detail to
              ensure a memorable presentation.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-12 my-20 place-items-center w-fit">
            {box.map((item, index) => (
              <div
                key={item.id}
                onClick={() => handleBoxSelect(index)}
                className={`lg:w-[370px] h-[435px] flex flex-col items-center rounded-[30px] shadow-[4px_4px_14px_0]/30 hover:shadow-[4px_4px_14px_0]/70 cursor-pointer  ${
                  boxSelected === index
                    ? "border-[1px] border-primaryColor"
                    : ""
                }`}
              >
                <div className="min-w-[286px] min-h-[286px]">
                  <img
                    src={item.boxImage}
                    alt={item.boxName}
                    className="w-full h-full p-8 aspect-square"
                  />
                </div>
                <p className="text-[18px] font-light">{item.boxName}</p>
                <p className="text-[18px] font-light">{item.boxPrice}</p>
              </div>
            ))}
          </div>
          <div className="flex flex-col items-center gap-6 mt-8">
            <button className="bg-primaryColor rounded-full px-28 sm:px-32 py-4 text-secondaryColor text-sm sm:text-base hover:opacity-75 transition-opacity duration-300 cursor-pointer">
              Next
            </button>
            <a
              href="/#buildBox"
              className="bg-transparent rounded-full px-28 sm:px-32 py-4 text-primaryColor border-[2px] text-sm sm:text-base hover:bg-primaryColor hover:text-secondaryColor transition-opacity duration-300 cursor-pointer"
            >
              Back
            </a>
          </div>
        </>
      )}
    </div>
  );
};

export default Box;
