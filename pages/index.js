import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";
import AuthButton from "../components/AuthButton";
import GIFGrid from "../components/GIFGrid";
import MainContainer from "../components/MainContainer";

import styles from "../styles/Home.module.css";

export default function Home() {
  const [walletAddress, setWalletAddress] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [gifList, setGifList] = useState([]);

  const TEST_GIFS = [
    "https://media.giphy.com/media/mBQJkqCHehmlq/giphy.gif",
    "https://media.giphy.com/media/udekPo4Tn0OI0/giphy.gif",
    "https://media.giphy.com/media/FhrmqGb83NJwA/giphy.gif",
    "https://media.giphy.com/media/h4F1B5OmmoMi4/giphy.gif",
  ];
  const checkIfWalletIsConnected = async () => {
    try {
      const { solana } = window;

      if (solana) {
        if (solana.isPhantom) {
          console.log("Phantom Wallet Found!");

          const response = await solana.connect({
            onlyIfTrusted: true,
          });
          console.log(
            "Connected with Public Key:",
            response.publicKey.toString()
          );
          setWalletAddress(response.publicKey.toString());
        } else {
          alert("Solana object not Found. Get a phantom Wallet");
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const onLoad = async () => {
      await checkIfWalletIsConnected();
    };
    window.addEventListener("load", onLoad);
    return () => window.removeEventListener("load", onLoad);
  }, []);

  useEffect(() => {
    if (walletAddress) {
      console.log("Fetching GIF list...");

      setGifList(TEST_GIFS);
    }
  }, [walletAddress]);

  return (
    <div className="">
      <Head>
        <title>Cinema Portal</title>
        <meta
          name="description"
          content="A gateway to cinematic gifs on solana"
        />
        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🎞</text></svg>"
        />
      </Head>
      <main className="w-screen h-screen flex flex-col gap-y-7 items-center justify-center mt-20">
        <div className="text-[50px] text-white font-bold">
          🎥 🎞 Cinema Portal
        </div>
        <div className="text-white text-[25px] font-normal  ">
          View iconic Cinema in the metaverse ✨
        </div>
        {!walletAddress ? (
          <AuthButton setWalletAddress={setWalletAddress} />
        ) : null}
        {walletAddress ? (
          <MainContainer
            TEST_GIFS={TEST_GIFS}
            inputValue={inputValue}
            setInputValue={setInputValue}
            gifList={gifList}
            setGifList={setGifList}
          />
        ) : null}
      </main>
    </div>
  );
}
