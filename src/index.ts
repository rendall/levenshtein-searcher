/// <reference path="dictionary.ts"/>

const setUnion = (a: Set<string>, b: Set<string>) => {
    let union = new Set(a);
    for (var elem of Array.from(b)) {
        union.add(elem);
    }
    return union;
}

const getSearchPattern = (word: string, x: number) => word.substring(0, x) + '.' + word.substring(x + 1);


const getCloseWordsUsing = (dict: string[], word: string): Set<string> => {

    if (word.toLowerCase() != word) return getCloseWordsUsing(dict, word.toLowerCase());

    const wordLength = word.length;
    const searchSpace = dict.filter((entry) => entry.length == wordLength);

    const wordsReplacingOneLetter = (word: string, x: number) => {

        if (x >= word.length || x < 0) {
            throw Error(`invalid index ${x} in wordsReplacingOneLetter`);
        }
        const wPattern = getSearchPattern(word, x);
        const pattern = new RegExp(wPattern);

        return searchSpace.filter((w) => w.match(pattern));
    }

    const concatUnique = (a: string[], b: string[]) => {

    }

    const closeWords = (i: number = 0, w: string[] = []): string[] => i >= word.length ? w : closeWords(i + 1, wordsReplacingOneLetter(word, i).concat(w));

    return new Set(closeWords());
}

const getCloseWords = (word: string) => getCloseWordsUsing(dictionary, word);

const getSentenceVariations = (sentence: string, i: number = 0, varis: Set<string> = new Set()): Set<string> => {
    if (sentence.indexOf('  ') >= 0) return getSentenceVariations(sentence.trim().replace('  ', ' '), i, varis);
    const words = sentence.split(' ');
    if (i >= words.length) return varis;

    const varyWord = words[i];
    const closeWords = Array.from(getCloseWords(varyWord));

    const assembleSentences = (words: string[], closeWords: string[], i: number, j: number = 0, sentences: Set<string> = new Set()): Set<string> => {
        if (j >= closeWords.length) return sentences;

        const leftWords = words.filter((val, idx) => idx < i);
        const rightWords = words.filter((val, idx) => idx > i);

        const ourSentence = (leftWords.join(' ') + ` ${closeWords[j]} ` + rightWords.join(' ')).trim();

        return assembleSentences(words, closeWords, i, j + 1, sentences.add(ourSentence));
    }

    return getSentenceVariations(sentence, i + 1, setUnion(varis, assembleSentences(words, closeWords, i)));
}

const cleanString = (str: string, clean: string = "", i: number = 0): string =>
    str.toLowerCase() != str || str.trim() != str ?
        cleanString(str.toLowerCase().trim(), clean, i) :
        i >= str.length ?
            clean :
            "abcdefghijklmnopqrstuvwxyz ".includes(str[i]) ?
                cleanString(str, clean + str[i], i + 1) :
                cleanString(str, clean, i + 1);

const getTitleVariations = (title:string) => getSentenceVariations(cleanString(title));