const TranslatorCards = (props) => {
  return (
    <>
      <div className="grid justify-center max-w-95 rounded-2xl bg-white border-3 border-[#8F8F8F]">
        <div className="flex">
          <img
            src={props.img?.src}
            alt={props.img?.alt}
            className={`w-30 h-30 ${
              props.img?.src === "" ? "" : "bg-[#D9D9D9]"
            }`}
          />
          <div className="min-h-30 max-w-50 ml-5">
            <div className="flex items-center gap-1">
              <p className="text-lg">
                <span className="text-[#8F8F8F]">Name: </span> {props.name}
              </p>
            </div>
            <div className="flex items-center gap-1">
              <p className="text-lg">
                <span className="text-[#8F8F8F]">Job Title: </span>{" "}
                {props.jobtitle}
              </p>
            </div>
            <div className="flex items-center gap-1">
              <p className="text-lg">
                <span className="text-[#8F8F8F]">Locations: </span>{" "}
                {props.location}
              </p>
            </div>
          </div>
        </div>
        <div className="mt-3">
          <div>
            <h1 className="text-[#8F8F8F] text-lg">Languages:</h1>
            <p className="text-sm ml-5 mb-2">{props.languages}</p>
          </div>
          <div>
            <h1 className="text-[#8F8F8F] text-lg">Services:</h1>
            <p className="text-sm ml-5 mb-2">{props.services}</p>
          </div>
          <div>
            <h1 className="text-[#8F8F8F] text-lg">Specialization:</h1>
            <p className="text-sm ml-5 mb-2">{props.specialization}</p>
          </div>
        </div>
        <div className="flex justify-center w-full mt-4">
          <button className="pt-2 pb-2 pr-6 pl-6 bg-[#38BF4C] text-white text-lg rounded-lg">
            More Details
          </button>
        </div>
      </div>
    </>
  );
};

export default TranslatorCards;
