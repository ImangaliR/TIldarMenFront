const PostProjects = () => {
  return (
    <>
      <div>
        <h1 className="text-3xl font-bold">Posting Projects</h1>
        <form className="bg-white w-280 min-h-150 grid px-30 rounded-md shadow-md mt-2">
          <div className="flex justify-end w-full h-10">
            <button className="w-45 h-10 bg-[#38BF4C] text-white text-lg rounded-3xl">
              New Project
            </button>
          </div>
          <div className="bg-[#EAF4F4] w-100 h-70 outline-1 outline-[#dcdcdc] rounded-sm px-3">
            <div className="flex gap-3 mt-5">
              <p className="min-w-20">Project Title</p>
              <input
                type="text"
                className="bg-[#EAF4F4] border-1 border-[#DCDCDC] rounded-sm w-70 h-8"
              />
            </div>
            <div className="flex gap-3 mt-2">
              <p className="min-w-20">Project Type</p>
              <input
                type="text"
                className="bg-[#EAF4F4] border-1 border-[#DCDCDC] rounded-sm w-70 h-8"
              />
            </div>
            <div className="flex gap-3 mt-2">
              <p className="min-w-20">Languages*</p>
              <div className="flex gap-2">
                <input
                  type="text"
                  className="bg-[#EAF4F4] border-1 border-[#DCDCDC] rounded-sm w-34 h-8 pl-3 text-sm"
                />
                <input
                  type="text"
                  className="bg-[#EAF4F4] border-1 border-[#DCDCDC] rounded-sm w-34 h-8 pl-3 text-sm"
                />
              </div>
            </div>
            <div className="flex gap-3 mt-2">
              <p className="min-w-20">Project Description</p>
              <input
                type="text"
                className="bg-[#EAF4F4] border-1 border-[#DCDCDC] p-3 w-70 h-30 rounded-sm text-sm"
              />
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default PostProjects;
