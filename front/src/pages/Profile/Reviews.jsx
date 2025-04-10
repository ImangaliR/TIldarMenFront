const Reviews = () => {
  return (
    <>
      <main className="flex gap-2 bg-white w-280 h-max min-h-130 rounded-lg p-5">
        <div className="p-5 rounded-lg border-1 border-[#dcdcdc] border-b-0 rounded-b-none">
          <div>
            <div className="flex flex-col items-center w-80">
              <img
                src=""
                alt=""
                className={`w-20 h-20 bg-gray-300 rounded-full animate-pulse`}
              />
              <h2 className="mt-4 text-[#5e5e5e]">Customer Reviews</h2>
              <h1 className="text-xl font-bold">4.50</h1>
              <p className="text-[#a3a2a2]">130 Reviews</p>
              <p>⭐️⭐️⭐️⭐️</p>
            </div>
            <div className="mt-4">
              <div className="flex items-center gap-2">
                <p>1</p>
                <h1>⭐️</h1>
                <p>87%</p>
              </div>
              <div className="flex items-center gap-2">
                <p>2</p>
                <h1>⭐️</h1>
                <p>70%</p>
              </div>
              <div className="flex items-center gap-2">
                <p>3</p>
                <h1>⭐️</h1>
                <p>50%</p>
              </div>
              <div className="flex items-center gap-2">
                <p>2</p>
                <h1>⭐️</h1>
                <p>20%</p>
              </div>
              <div className="flex items-center gap-2">
                <p>1</p>
                <h1>⭐️</h1>
                <p>5%</p>
              </div>
            </div>
          </div>
        </div>
        <div className="ml-5">
          <div>
            <img
              src=""
              alt=""
              className="bg-purple-500 w-180 h-50 rounded-xl"
            />
          </div>
          <div className="border-1 border-[#dcdcdc] border-b-0 rounded-lg rounded-b-none p-1 mt-10">
            <div className="border-1 border-[#dcdcdc]  rounded-lg p-2 m-2">
              <img src="" alt="" />
              <div>
                <div className="flex justify-between items-center">
                  <h1>Cody Fisher</h1>
                  <h1>⭐️⭐️⭐️⭐️⭐️</h1>
                </div>
                <p>22 Dec, 2023</p>
                <p>Cody Fisher spearheads SpaceX and Tesla</p>
              </div>
            </div>
            <div className="border-1 border-[#dcdcdc]  rounded-lg p-2 m-2">
              <img src="" alt="" />
              <div>
                <div className="flex justify-between items-center">
                  <h1>Cody Fisher</h1>
                  <h1>⭐️⭐️⭐️⭐️⭐️</h1>
                </div>
                <p>22 Dec, 2023</p>
                <p>Cody Fisher spearheads SpaceX and Tesla</p>
              </div>
            </div>
            <div className="border-1 border-[#dcdcdc]  rounded-lg p-2 m-2">
              <img src="" alt="" />
              <div>
                <div className="flex justify-between items-center">
                  <h1>Cody Fisher</h1>
                  <h1>⭐️⭐️⭐️⭐️⭐️</h1>
                </div>
                <p>22 Dec, 2023</p>
                <p>Cody Fisher spearheads SpaceX and Tesla</p>
              </div>
            </div>
            <div className="border-1 border-[#dcdcdc]  rounded-lg p-2 m-2">
              <img src="" alt="" />
              <div>
                <div className="flex justify-between items-center">
                  <h1>Cody Fisher</h1>
                  <h1>⭐️⭐️⭐️⭐️⭐️</h1>
                </div>
                <p>22 Dec, 2023</p>
                <p>Cody Fisher spearheads SpaceX and Tesla</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Reviews;
