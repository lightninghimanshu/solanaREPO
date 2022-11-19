export PATH=~/Downloads/solana-release/bin:$PATH

solana-keygen new --outfile ~/.config/solana/$1.json --force

solana config set --keypair ~/.config/solana/$1.json

solana config set --url https://metaplex.devnet.rpcpool.com/

solana airdrop 0.2 -k ~/.config/solana/$1.json --url devnet

touch walletaddr

solana address > walletaddr