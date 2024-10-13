const content = [
  {
    image: "/dashboard/encryption.png",
    desc: "100% secured data",
  },
  {
    image: "/dashboard/man.png",
    desc: "Trusted by users",
  },
  {
    image: "/dashboard/tap.png",
    desc: "Easy to use",
  },
  {
    image: "/dashboard/medal.png",
    desc: "App of the day",
  },
];

const FeatureCards = () => {
  return (
    <div className="flex flex-row justify-center my-20 gap-10 ">
      {content.map((items,index) => (
        <div key={index} className="bg-white flex flex-col items-center px-10 py-5 shadow-lg hover:text-sky-400 transition-transform duration-300 transform hover:scale-125 ease-in-out delay-150">
          <img src={items.image} style={{ width: "50px" }} />
          <p className={`text-sky-800 font-medium`}>{items.desc}</p>
        </div>
      ))}
    </div>
  );
};

export default FeatureCards;
