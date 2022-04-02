import Head from "next/head";
import Image from "next/image";
import { useEffect } from "react";

import styles from "../styles/Home.module.css";

export default function Home() {
  const checkIfWalletIsConnected = async () => {
    try {
      const { solana } = window;

      if (solana) {
        if (solana.isPhantom) {
          console.log("Phantom Wallet Found!");
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
  return (
    <div className="">
      <Head>
        <title>Cinema Portal</title>
        <meta
          name="description"
          content="A gateway to cinematic gifs on solana"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="w-scren h-screen flex flex-col gap-y-7 items-center justify-center">
        <div className="text-[50px] text-white font-bold">
          🎥 🎞 Cinema Portal
        </div>
        <div className="text-white text-[25px] font-normal  ">
          View iconic Cinema in the metaverse ✨
        </div>
      </main>
    </div>
  );
}
