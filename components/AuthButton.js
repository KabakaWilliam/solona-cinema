const AuthButton = ({ setWalletAddress }) => {
  const connectWallet = async () => {
    const { solana } = window;
    if (solana) {
      const response = await solana.connect();
      setWalletAddress(response.publicKey.toString());
      console.log(`Connected with Public Key:`, response.publicKey.toString());
    }
  };
  return (
    <button
      onClick={connectWallet}
      className="w-[150px] h-[40px] rounded-xl font-bold text-black bg-gradient-to-r from-blue-300 to bg-green-200 shadow-xl shadow-black "
    >
      Connect wallet
    </button>
  );
};

export default AuthButton;
