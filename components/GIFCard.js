const GIFCard = ({ gif }) => {
  return (
    <div className="w-[28vw] h-[40vh] cursor-pointer hover:opacity-20 rounded-lg">
      <img className="object-cover w-[100%] h-[100%] rounded-lg" src={gif} />
    </div>
  );
};

export default GIFCard;
