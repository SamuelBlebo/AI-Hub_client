import React, { useState, useEffect } from "react";
import axios from "axios";

import { FaMicrochip } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";

import AddAi from "./AddAi";
import Searchbar from "./Searchbar";
import User from "./User";

export default function AIList() {
  const [data, setData] = useState([]);
  const [originalData, setOriginalData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [notFoundMessage, setNotFoundMessage] = useState(null);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "http://ai-hub-server.vercel.app/api/ai/"
      );
      setData(response.data);
      setOriginalData(response.data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleFormSubmit = async () => {
    setLoading(true);

    try {
      await fetchData();
      setSuccessMessage("Added successfully!");
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }

    setTimeout(() => {
      setSuccessMessage(null);
    }, 3000);
  };
  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error.message}</p>;
  }

  const deleteAi = async (id) => {
    try {
      await fetch(`https://ai-hub-server.vercel.app/api/ai/${id}`, {
        method: "DELETE",
      });

      setLoading(true);

      try {
        await fetchData();
        setSuccessMessage("Deleted successfully!");
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }

      setTimeout(() => {
        setSuccessMessage(null);
      }, 3000);
    } catch (err) {
      console.error(err.message);
    }
  };

  const handleSearch = (query) => {
    const lowerCaseQuery = query.toLowerCase();
    const filteredData = originalData.filter((ai) =>
      ai.name.toLowerCase().includes(lowerCaseQuery)
    );

    if (filteredData.length === 0) {
      setNotFoundMessage(`No result(s) found for "${query}"`);
    } else {
      setNotFoundMessage(null);
    }

    setData(filteredData);
  };

  return (
    <>
      <div className=" w-[100%] flex justify-between items-center px-[20px]">
        <AddAi onFormSubmit={handleFormSubmit} />
        <Searchbar onSearch={handleSearch} />
        <User />
      </div>

      {successMessage && (
        <div className="bg-green-500 text-white py-2 px-4 mt-4 rounded-[10px]">
          {successMessage}
        </div>
      )}

      {notFoundMessage && (
        <div className="bg-red-500 text-white py-2 px-4 mt-4 rounded-[10px]">
          {notFoundMessage}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-[12vh]  px-4">
        {data
          .slice() //
          .sort((a, b) => a.name.localeCompare(b.name))
          .map((ai) => (
            <div
              key={ai._id}
              className="bg-[#293542] rounded-[10px] overflow-hidden flex flex-col mb-[25px]"
            >
              <div className="bg-[#415163] rounded-t-[10px] h-[80px] flex justify-center items-center">
                <FaMicrochip className="text-4xl" />
              </div>
              <div className="py-4 px-6 flex-grow">
                {/* text div */}
                <div>
                  <h3 className="text-2xl font-bold mb-2 text-[#fff]">
                    {ai.name}
                  </h3>
                  <p className="text-[16px] font-normal text-[#888888] mb-2">
                    {ai.category}
                  </p>
                  <p className="text-[14px] text-[#f0f0f0] ">
                    {ai.description}
                  </p>
                </div>
              </div>

              {/* detail div */}
              <div className="detail py-4 px-6 flex justify-between items-center">
                <div className="bg-[#415163] rounded-[5px] w-[25%] flex justify-center">
                  <a
                    href={`//${ai.link}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white text-[12px] no-underline cursor-pointer hover:text-darkblue"
                  >
                    Detail
                  </a>
                </div>
                <div className="opacity-0 hover:opacity-100">
                  <MdDelete
                    className="text-[#ff1d1d] text-[20px]"
                    onClick={() => deleteAi(ai._id)}
                  />
                </div>
                <div>
                  <p className="text-[#5e5e5e]">{ai.price}</p>
                </div>
              </div>
            </div>
          ))}
      </div>
    </>
  );
}
