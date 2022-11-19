sugar upload -k ~/.config/solana/$1.json
sugar deploy -k ~/.config/solana/$1.json
sugar verify -k ~/.config/solana/$1.json
sugar mint --receiver $2 -k ~/.config/solana/$1.json