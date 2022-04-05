const anchor = require("@project-serum/anchor");
const { SystemProgram } = anchor.web3;

const main = async () => {
  console.log("🚀 Starting test...");

  const provider = anchor.Provider.env();
  anchor.setProvider(provider);

  const program = anchor.workspace.Myprojectanchor;

  //   create an account keypair for the account to use
  const baseAccount = anchor.web3.Keypair.generate();

  //Call start_stuff_off: Give it the params it needs

  let tx = await program.rpc.startStuffOff({
    accounts: {
      baseAccount: baseAccount.publicKey,
      user: provider.wallet.publicKey,
      systemProgram: SystemProgram.programId,
    },
    signers: [baseAccount],
  });
  console.log("📝 Your transacrion signature", tx);

  //   fetch data from the account
  let account = await program.account.baseAccount.fetch(baseAccount.publicKey);
  console.log(`👀 GIF Count`, account.totalGifs.toString());

  await program.rpc.addGif(
    "https://media.giphy.com/media/3o7aTpv2JCimZQpABy/giphy.gif",
    {
      accounts: {
        baseAccount: baseAccount.publicKey,
        user: provider.wallet.publicKey,
      },
    }
  );

  //Get the account again to see what changed
  account = await program.account.baseAccount.fetch(baseAccount.publicKey);
  console.log(`👀 GIF Count`, account.totalGifs.toString());

  // Access gif_list on the account
  console.log(`👀 GIF List`, account.gifList);
};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

runMain();
