use anchor_lang::prelude::*;

declare_id!("Fg6PaFpoGXkYsidMpWTK6W2BeZ7FEfcYkg476zPFsLnS");

#[program]
pub mod myprojectanchor{
    use super::*;
    pub fn start_stuff_off(ctx: Context<StartStuffOff>)-> Result <()>{
        // getting a reference to the account
        let base_account = &mut ctx.accounts.base_account;
        // initialize total gifs
        base_account.total_gifs = 0;
        Ok(())
    }
    // add _gif now accepts a gif_link param from the user.We also reference the user from the context
    pub fn add_gif(ctx: Context<AddGif>, gif_link:String)->Result<()>{
        //get a reference to the account and incement total_gifs
        let base_account = &mut ctx.accounts.base_account;
        let user = &mut ctx.accounts.user;

        // Build the struct
        let item = ItemStruct{
            gif_link: gif_link.to_string(),
            user_address: *user.to_account_info().key,
        };

        //Add it to the gif_list vector.
        base_account.gif_list.push(item);
        base_account.total_gifs +=1;
        Ok(())
    }
}

// Attach certain variables to the StartStuffOff Context
#[derive(Accounts)]
pub struct StartStuffOff<'info> {
    #[account(init, payer=user, space =9000)]
    pub base_account: Account<'info, BaseAccount>,
    #[account(mut)]
    pub user: Signer<'info>,
    pub system_program: Program <'info, System>,
}
// Specify what data should be in the AddGif Context
#[derive(Accounts)]
pub struct AddGif<'info>{
    #[account(mut)]
    pub base_account: Account<'info, BaseAccount>,
    // Add the signer who calls the AddGif method to the struct so that we can save it
    #[account(mut)]
    pub user:Signer<'info>,
}

// Create a custom struct to work with
#[derive(Debug, Clone, AnchorSerialize, AnchorDeserialize)]
pub struct ItemStruct{
    pub gif_link:String,
    pub user_address:Pubkey,
}

// Tell Solana what we want to store on this account
#[account]
pub struct BaseAccount{
    pub total_gifs: u64,
    //Attach a Vector of type ItemStruct to the account
    pub gif_list: Vec<ItemStruct>,
}