import React, { useState } from "react";

import { useNavigate } from "react-router-dom";
import { useToast } from "../context/ToastContext";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { allBoxes, allCakes, allCards } from "../redux/slices/userSlice";
import { addBoxToCart, addCakesToCart, addCardToCart} from "../redux/slices/cartSlice";

const Box = () => {
  const navigate = useNavigate();
  const { addToast } = useToast();
  const { cakes, cards, boxes } = useSelector((state) => state.user);
  // const { cartCakes, cartBoxes, cartCards } =useSelector((state)=> state.cart)
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [chooseCake, setChooseCake] = useState(true);
  const [chooseBox, setChooseBox] = useState(false);
  const [chooseCard, setChooseCard] = useState(false);

 

  const uniqueCategories = [...new Set(cakes.map((cake) => cake.category))];

  const handleNext = async () => {
    if (selectedCakes.length === 0) {
      addToast("Please select at least one cake to proceed.", "error", 3000);
      return;
    }

    try {
      for (const cakeId of selectedCakes) {
        const cake = cakes.find((cake) => cake._id === cakeId);

        if (!cake) {
          throw new Error("Selected cake not found.");
        }

        const result = await dispatch(
          addCakesToCart({
            userId: user._id,
            cakeId,
            quantity: 1,
            price: cake.cakePrice,
          })
        );

        if (addCakesToCart.rejected.match(result)) {
          throw new Error(result.payload);
        }
      }

      addToast("Cake(s) added to cart successfully!", "success", 3000);
      setChooseCake(false);
      setChooseBox(true);
      window.scrollTo(0, 0);
    } catch (error) {
      addToast(
        error.message || "Something went wrong while adding cakes.",
        "error",
        3000
      );
    }
  };

  const handleBack = () => {
    navigate("/#buildBox");
    setChooseBox(false);
  };
  const handleNextBox = async () => {
    if (boxSelected === null) {
      addToast("Please select a box to proceed.", "error", 3000);
      return;
    }
    
    const selectedBox = boxes[boxSelected];
    if (!selectedBox) {
      addToast("Selected box not found.", "error", 3000);
      return;
    }
    
    try {
      const result = await dispatch(
        addBoxToCart({
          userId: user._id,
          boxId: selectedBox._id,
          quantity: 1,
          price: selectedBox.boxPrice,
        })
      );
  
      if (addBoxToCart.rejected.match(result)) {
        throw new Error(result.payload);
      }
  
      setChooseBox(false);
      setChooseCard(true);
      addToast("Box selected successfully!", "success", 3000);
      window.scrollTo(0, 0);
    } catch (error) {
      addToast(
        error.message || "Something went wrong while adding the box.",
        "error",
        3000
      );
    }
  }
  const handleBackBox = () => {
    setChooseBox(false);
    setChooseCake(true);
    window.scrollTo(0, 0);
  };

  const [filteredCategory, setFilteredCategory] = useState("all");
  const displayedCakes =
    filteredCategory === "all"
      ? cakes
      : cakes.filter((cake) => cake.category === filteredCategory);

  const [selectedCakes, setSelectedCakes] = useState([]);
  const [boxSelected, setBoxSelected] = useState(null);
  const [cardSelected, setCardSelected] = useState(null);

  const toggleCakeSelection = (id) => {
    // getSelectedCart()
    if (selectedCakes.includes(id)) {
      setSelectedCakes(selectedCakes.filter((cakeId) => cakeId !== id));
      addToast("Cake Removed", "success", 3000);
    } else {
      setSelectedCakes([...selectedCakes, id]);
      addToast("Cake Added", "success", 3000);
    }
  };
  const handleBoxSelect = (index) => {
    setBoxSelected(index);
  };

  const [to, setTo] = useState("");
  const [from, setFrom] = useState("");
  const [message, setMessage] = useState("");

  const handleCardSelect = (index) => {
    setCardSelected(index);
  };

  const handleNextCard = async() => {
    if (cardSelected === null) {
      addToast("Please select a box to proceed.", "error", 3000);
      return;
    }
    
    const selectedCard = cards[cardSelected];
    if (!selectedCard) {
      addToast("Selected card not found.", "error", 3000);
      return;
    }
    if (!to || !from) {
      addToast("Please fill in all card details to proceed.", "error", 3000);
      return;
    }
   
    const result = await dispatch(
      addCardToCart({
        userId: user._id,
        cardId: selectedCard._id,
      
        
        quantity: 1,
        price: selectedCard.cardPrice,
        to,
        from,
        message
      })
    );

    if (addCardToCart.rejected.match(result)) {
      throw new Error(result.payload);
    }
    addToast("Card selected successfully!", "success", 3000);
    navigate("/checkout");
  };
  const handleBackCard = () => {
    setChooseCard(false);
    setChooseBox(true);
    window.scrollTo(0, 0);
  };

  // const getSelectedCart = ()=>{
  //   dispatch(getCartCakes({userId: user._id}))
  //   dispatch(getCartBoxes({userId: user._id}))
  //   dispatch(getCartCards({userId: user._id}))
  // }

  

  

  useEffect(() => {
    dispatch(allCakes());
    // if (user?._id) {
    //   dispatch(getCartCakes(user._id)); 
    // }
  }, [dispatch]);
  // useEffect(() => {
  //   if (cartCakes?.length > 0 && cakes?.length > 0) {
  //     const cakeIdsInCart = cartCakes.map(item => item.cakeId._id);
  //     setSelectedCakes(cakeIdsInCart);
  //   }
  // }, [cartCakes, cakes]);

  useEffect(() => {
    dispatch(allBoxes());
    // if (user?._id) {
    //   dispatch(getCartBoxes(user._id)); 
    // }
  }, [dispatch]);

  // useEffect(() => {
  //   if (cartBoxes?.length > 0 && boxes?.length > 0) {
  //     const boxIdsInCart = cartBoxes.map(item => item.boxId._id);
  //     setBoxSelected(boxIdsInCart);
  //   }
  // }, [cartCakes, cakes]);

  useEffect(() => {
    dispatch(allCards());
    // if (user?._id) {
    //   dispatch(getCartCards(user._id)); 
    // }
  }, [dispatch]);

  // useEffect(() => {
  //   if (cartCards?.length > 0 && cards?.length > 0) {
  //     const cartIdsInCart = cartCards.map(item => item.cardId._id);
  //     setBoxSelected(cartIdsInCart);
  //   }
  // }, [cartCards, cards]);
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
                className={`md:py-[16px] md:px-[35px] px-8 py-2 text-sm md:text-base rounded-full capitalize ${
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
                    src={item.cakeImage.url}
                    alt={item.cakeName}
                    className="w-full h-full  aspect-square "
                  />
                </div>
                <div className="flex flex-col gap-[8px]">
                  <p className="text-[18px] font-[500]">{item.cakeName}</p>
                  <p className="text-[18px] font-[500]">Rs. {item.cakePrice}</p>
                </div>
                <button
                  onClick={() => toggleCakeSelection(item._id)}
                  className={`w-fit py-[16px] px-[58px] rounded-full font-light border-[2px] text-[18px] transition-colors duration-300 ${
                    selectedCakes.includes(item._id)
                      ? "bg-primaryColor text-secondaryColor"
                      : "hover:bg-primaryColor hover:text-secondaryColor"
                  }`}
                >
                  {selectedCakes.includes(item._id) ? "Added" : "Add to Box"}
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

          <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-12 my-20 place-items-center ">
            {boxes.map((item, index) => (
              <div
                key={index}
                onClick={() => handleBoxSelect(index)}
                className={`lg:w-[370px] h-[435px] flex flex-col items-center rounded-[30px] shadow-[4px_4px_14px_0]/30 hover:shadow-[4px_4px_14px_0]/70 cursor-pointer  ${
                  boxSelected === index
                    ? "border-[1px] border-primaryColor"
                    : ""
                }`}
              >
                <div className="min-w-[286px] min-h-[286px]">
                  <img
                    src={item.boxImage.url}
                    alt={item.boxName}
                    className="w-full h-full p-8 aspect-square"
                  />
                </div>
                <p className="text-[18px] font-[500] ">{item.boxName}</p>
                <p className="text-[18px] font-[500]">Rs. {item.boxPrice}</p>
              </div>
            ))}
          </div>
          <div className="flex justify-between items-center ">
            <button
              onClick={handleBackBox}
              className="text-sm md:text-base py-[15px] px-[40px] bg-transparent rounded-full border-[2px] font-light hover:opacity-75 duration-300 transition-opacity cursor-pointer"
            >
              Back
            </button>
            <button
              onClick={handleNextBox}
              className="text-sm md:text-base py-[15px] px-[40px] bg-primaryColor text-secondaryColor rounded-full border-[2px] font-light hover:opacity-75 duration-300 transition-opacity cursor-pointer"
            >
              Next
            </button>
          </div>
        </>
      )}
      {chooseCard && (
        <>
          <div className="flex flex-col items-center">
            <h1 className="text-center font-[400] text-[45px] leading-12 sm:text-[60px] font-volgue my-12">
              Write a Card
            </h1>
            <p className="w-[80%] text-center font-light leading-6 mt-[-30px] text-[18px]">
              Add a heartfelt message, funny note, or even an inside joke. This
              is your moment to express what words a cake alone can’t — and
              we’ll make sure it’s written just right.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-12 my-20 place-items-center ">
            {cards.map((item, index) => (
              <div
                key={item.id}
                onClick={() => handleCardSelect(index)}
                className={`lg:w-[370px] h-[435px] flex flex-col items-center py-[50px] px-[75px] rounded-[30px] shadow-[4px_4px_14px_0]/30 hover:shadow-[4px_4px_14px_0]/70 cursor-pointer  ${
                  cardSelected === index
                    ? "border-[1px] border-primaryColor"
                    : ""
                }`}
              >
                <div className=" w-[180px] h-[262px]">
                  <img
                    src={item.cardImage.url}
                    alt={item.cardName}
                    className="w-full h-full  aspect-square"
                  />
                </div>
                <p className="text-[18px] font-[500] mt-8">{item.cardName}</p>
                <p className="text-[18px] font-[500]">Rs. {item.cardPrice}</p>
              </div>
            ))}
          </div>
          <div className="flex   justify-center mt-24 ">
            <div className="lg:w-[600px] md:w-[500px] sm:w-[430px] w-[350px] flex flex-col gap-8">
              <div className="w-full">
                <p className="text-[18px] font-light">To *</p>
                <input
                  type="text"
                  className="focus:outline-none border-b-[2px] w-full"
                  value={to}
                  onChange={(e) => setTo(e.target.value)}
                  required
                />
              </div>
              <div className="w-full">
                <p className="text-[18px] font-light">From *</p>
                <input
                  type="text"
                  className="focus:outline-none border-b-[2px] w-full"
                  value={from}
                  onChange={(e) => setFrom(e.target.value)}
                  required
                />
              </div>
              <div className="w-full">
                <p className="text-[18px] font-light">Message</p>
                <textarea
                  className="focus:outline-none border-b-[2px] w-full h-[100px] resize-none"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
              </div>
              <div className="mt-16 flex justify-between items-center">
                <button
                  onClick={handleBackCard}
                  className="text-sm md:text-base py-[15px] px-[40px] bg-transparent rounded-full border-[2px] font-light hover:opacity-75 duration-300 transition-opacity cursor-pointer"
                >
                  Back
                </button>
                <button
                  onClick={handleNextCard}
                  className="text-sm md:text-base py-[15px] px-[40px] bg-primaryColor text-secondaryColor rounded-full border-[2px] font-light hover:opacity-75 duration-300 transition-opacity cursor-pointer"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Box;
