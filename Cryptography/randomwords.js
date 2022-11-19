import randomWords from 'random-words';

export default function randomWordsGenerator() {
    return randomWords({ exactly: 8, join: ' ' });
}

