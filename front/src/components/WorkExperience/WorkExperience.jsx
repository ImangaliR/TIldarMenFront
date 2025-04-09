function WorkExperience() {
  return (
    <>
      <div className="bg-[#EAF4F4] w-100 h-70 outline-1 outline-[#dcdcdc] rounded-sm px-3">
        <div className="flex gap-3 mt-5">
          <p className="min-w-20">Role*</p>
          <input
            type="text"
            className="bg-[#EAF4F4] border-1 border-[#DCDCDC] rounded-sm w-70 h-8"
          />
        </div>
        <div className="flex gap-3 mt-2">
          <p className="min-w-20">Company</p>
          <input
            type="text"
            className="bg-[#EAF4F4] border-1 border-[#DCDCDC] rounded-sm w-70 h-8"
          />
        </div>
        <div className="flex gap-3 mt-2">
          <p className="min-w-20">Duration*</p>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Start Date"
              className="bg-[#EAF4F4] border-1 border-[#DCDCDC] rounded-sm w-34 h-8 pl-3 text-sm"
            />
            <input
              type="text"
              placeholder="End Date"
              className="bg-[#EAF4F4] border-1 border-[#DCDCDC] rounded-sm w-34 h-8 pl-3 text-sm"
            />
          </div>
        </div>
        <div className="flex gap-3 mt-2">
          <p className="min-w-20">Description</p>
          <input
            type="text"
            className="bg-[#EAF4F4] border-1 border-[#DCDCDC] p-3 w-70 h-30 rounded-sm text-sm"
          />
        </div>
      </div>
    </>
  );
}

export default WorkExperience;
