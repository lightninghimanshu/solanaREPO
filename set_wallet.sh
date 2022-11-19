export PATH=~/Downloads/solana-release/bin:$PATH


solana config set --keypair ~/.config/solana/$1.json

solana config set --url https://metaplex.devnet.rpcpool.com/


touch walletaddr

solana address > walletaddr