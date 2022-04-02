import React from "react";
import GIFGrid from "./GIFGrid";

const MainContainer = ({
  TEST_GIFS,
  setInputValue,
  inputValue,
  setGifList,
  gifList,
}) => {
  const onChange = (e) => {
    const { value } = e.target;
    setInputValue(value);
  };

  const sendGif = async () => {
    if (inputValue.length > 0) {
      console.log("Gif link:", inputValue);
      setGifList([...gifList, inputValue]);
      setInputValue("");
    } else {
      console.log("Empty input. Try again.");
    }
  };

  return (
    <div className="">
      <form
        className="w-[88vw] h-[5vh] flex justify-center mx-[5vw] mb-10 "
        onSubmit={(e) => {
          e.preventDefault();
          sendGif();
        }}
      >
        <input
          type="text"
          placeholder="Enter a gif from a film"
          className="w-[60vw] h-[100%] rounded-lg"
          onChange={onChange}
        />
        {/* <button type="submit">Submit</button> */}
      </form>
      <div className="">
        <GIFGrid TEST_GIFS={TEST_GIFS} gifList={gifList} />
      </div>
    </div>
  );
};

export default MainContainer;
