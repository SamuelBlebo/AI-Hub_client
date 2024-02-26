import React, { useState, useEffect } from "react";
import axios from "axios";

import { useAuth } from "../auth/AuthContext";

import { FaMicrochip } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";

import AddAi from "./AddAi";
import Searchbar from "./Searchbar";
import Sidebar from "./Sidebar";
import User from "./User";

export default function AIList() {
  const [data, setData] = useState([]);
  const [originalData, setOriginalData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [loginSuccessMessage, setLoginSuccessMessage] = useState(null);
  const [notFoundMessage, setNotFoundMessage] = useState(null);
  const { currentUser } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://ai-hub-server.vercel.app/api/ai/"
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
    if (currentUser) {
      setLoginSuccessMessage("Logged In");
    }

    setTimeout(() => {
      setLoginSuccessMessage(null);
    }, 2000);

    fetchData();
  }, [currentUser]);

  useEffect(() => {
    const filteredData = originalData.filter(
      (ai) =>
        ai.name.toLowerCase().startsWith(searchQuery.toLowerCase()) ||
        ai.price.toLowerCase() === searchQuery.toLowerCase() ||
        ai.category.toLowerCase() === searchQuery.toLowerCase()
    );

    setData(filteredData);

    if (filteredData.length === 0) {
      setNotFoundMessage(`No result(s) found for "${searchQuery}"`);

      setTimeout(() => {
        setNotFoundMessage(null);
      }, 3500);
      setData(originalData);
    } else {
      setNotFoundMessage(null);
    }
  }, [searchQuery, originalData]);

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
    setSearchQuery(query);
  };

  return (
    <>
      <div className=" w-[100%] flex justify-between items-center px-[20px]">
        {currentUser ? <AddAi onFormSubmit={handleFormSubmit} /> : <div></div>}

        <Searchbar onSearch={handleSearch} />
        <Sidebar onSearch={handleSearch} />
        {currentUser ? <User /> : <div></div>}
      </div>

      {loginSuccessMessage && (
        <div className="bg-green-500 text-white py-1 px-4 mt-2 rounded-md">
          {loginSuccessMessage}
        </div>
      )}
      {successMessage && (
        <div className="bg-green-500 text-white py-1 px-4 mt-2 rounded-md">
          {successMessage}
        </div>
      )}

      {notFoundMessage && (
        <div className="bg-red-500 text-white py-1 px-4 mt-2 rounded-md">
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
                    Visit
                  </a>
                </div>
                {currentUser ? (
                  <div className="opacity-0 hover:opacity-100">
                    <MdDelete
                      className="text-[#ff1d1d] text-[20px]"
                      onClick={() => deleteAi(ai._id)}
                    />
                  </div>
                ) : (
                  <div></div>
                )}

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
