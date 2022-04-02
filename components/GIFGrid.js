import GIFCard from "./GIFCard";

const GIFGrid = ({ TEST_GIFS, gifList }) => {
  return (
    <div className="w-[88vw] h-max flex flex-wrap mx-[5vw] gap-x-[2vw] gap-y-[2vw]">
      {gifList.map((gif) => (
        <GIFCard gif={gif} key={Math.random() * 2000} />
      ))}
    </div>
  );
};

export default GIFGrid;
