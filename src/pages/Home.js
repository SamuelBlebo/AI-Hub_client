// componenets

import AIList from "../components/AIList";

export default function Home() {
  return (
    <>
      <div>
        <div className="bg-[#1D2630] w-[84%] h-screen overflow-y-auto  fixed top-0 right-0 flex flex-col items-center 2xl:px-[10%] ">
          <AIList />
        </div>
      </div>
    </>
  );
}
