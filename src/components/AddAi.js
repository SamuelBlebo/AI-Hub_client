import React, { useState } from "react";
import { MdAddCircle, MdClose } from "react-icons/md";

export default function AddAi({ onFormSubmit }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [link, setLink] = useState("");
  const [price, setPrice] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const ai = { name, description, category, link, price };
    console.log("Form Data:", ai);

    try {
      const response = await fetch("https://ai-hub-server.vercel.app/api/ai/", {
        method: "POST",
        body: JSON.stringify(ai),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const json = await response.json();

      if (!response.ok) {
        setError(json.error);
      }
      if (response.ok) {
        setError(null);
        setName("");
        setDescription("");
        setCategory("");
        setLink("");
        setPrice("");
      }
      onFormSubmit();
    } catch (error) {
      setError(error.message);
    }
  };

  const [isPopupOpen, setPopupOpen] = useState(false);

  const openPopup = () => {
    setPopupOpen(true);
  };

  const closePopup = () => {
    setPopupOpen(false);
  };

  return (
    <>
      <div className="mt-[50px] flex items-center justify-center">
        <MdAddCircle className="text-white text-[30px]" onClick={openPopup} />
      </div>
      {isPopupOpen && (
        <>
          <div
            className="fixed top-0 left-0 w-full h-full bg-gray-800 opacity-90 z-50"
            onClick={closePopup}
          ></div>
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2   rounded-[10px] shadow-md z-50  w-[300px] h-[350px] bg-[#343F4C]">
            <div className="flex flex-row  justify-between h-[70px] px-[20px] items-center">
              <div>
                <h3 className=" text-[#fff] font-70">Add an AI</h3>
              </div>
              <div>
                <MdClose
                  className="close-button cursor-pointer text-[#fff] font-bold"
                  onClick={closePopup}
                />
              </div>
            </div>
            <div className="bg-[#293542] w-[100%] h-[100%] flex flex-col justify-center rounded-b-[10px]">
              <form
                onSubmit={handleSubmit}
                className="flex flex-col items-center"
              >
                <input
                  className="w-[90%] rounded-[10px] px-[10px] py-[5px] mb-[10px] mt-[15px] focus:outline-none bg-[#e9e9e9]  "
                  type="text"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
                <div className="w-[90%] rounded-[10px] px-[10px] py-[5px] mb-[10px] flex  justify-center">
                  <div className="w-[50%]  flex justify-center mr-4 ml-[-5px] px-2 ">
                    <label>
                      <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        required
                        className="focus:outline-none bg-[#e9e9e9]  py-[5px] px-4 rounded-[10px]"
                      >
                        <option value="" disabled hidden>
                          Category
                        </option>
                        <option value="Tech">Tech</option>
                        <option value="Image">Image</option>
                        <option value="Vidoe">Vidoe</option>
                        <option value="SEO">SEO</option>
                      </select>
                    </label>
                  </div>
                  <div className="w-[50%]  flex justify-center  px-2 ">
                    <label>
                      <select
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        required
                        className=" focus:outline-none bg-[#e9e9e9]  py-[5px] px-4 rounded-[10px] "
                      >
                        <option value="" disabled hidden>
                          Price
                        </option>
                        <option value="Free">Free</option>
                        <option value="Freemium">Freemium</option>
                        <option value="Premium">Premium</option>
                      </select>
                    </label>
                  </div>
                </div>

                <input
                  className="w-[90%] rounded-[10px] px-[10px] py-[5px] mb-[10px] focus:outline-none bg-[#e9e9e9] "
                  type="text"
                  placeholder="Link"
                  value={link}
                  onChange={(e) => setLink(e.target.value)}
                  required
                />

                <textarea
                  className="w-[90%] h-[120px] rounded-[10px] px-[10px] py-[5px] mb-[10px] focus:outline-none bg-[#e9e9e9]  "
                  type="text"
                  placeholder="Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  maxLength={250}
                  required
                />

                <button className=" bg-[#e9e9e9] py-[5px] px-[10px] rounded-[10px] text-[10px] font-bold">
                  SUBMIT
                </button>
                {error && <div className="error">{error}</div>}
              </form>
            </div>
          </div>
        </>
      )}
    </>
  );
}
