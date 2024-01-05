import { BsSliders } from "react-icons/bs";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";

export default function Sidebar() {
  return (
    <>
      <div className="w-[16%] h-[100vh] bg-[#1D2630] fixed top-0 left-0 border-[#1b1b1b] border-r-[0.5px] pl-[3%]">
        <div className="h-[30px] w-[80px] bg-[#fff] mt-[50px]   rounded-tl-[10px] rounded-br-[10px]"></div>
        <div>
          <BsSliders className="text-[#fff] text-[24px] mt-[12vh] " />
        </div>
        <div className="text-[#fff] text-[16px] mt-[50px]   display flex space-x-2">
          <h3 className="font-semibold">All</h3>
          <MdOutlineKeyboardArrowDown className=" text-[24px]" />
        </div>
        <div className="text-[#fff] text-[16px] mt-[20px]   display flex space-x-2">
          <h3 className="font-semibold">Price</h3>
          <MdOutlineKeyboardArrowDown className=" text-[24px]" />
        </div>
        <div className="text-[#fff] text-[16px] mt-[20px]   display flex space-x-2 ">
          <h3 className="font-semibold">Category</h3>
          <MdOutlineKeyboardArrowDown className=" text-[24px]" />
        </div>

        <div className="flex space-x-2 fixed bottom-[50px]">
          <div className="flex justify-center items-center h-[30px] w-[65px] bg-white mt-[20px]   rounded-tl-[10px] font-bold text-[14px]">
            Login
          </div>
          <div className="flex justify-center items-center h-[30px] w-[65px] bg-white mt-[20px]   rounded-br-[10px] font-bold text-[14px] ">
            Signup
          </div>
        </div>
      </div>
    </>
  );
}
