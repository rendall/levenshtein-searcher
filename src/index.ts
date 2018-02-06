/// <reference path="dictionary.ts"/>
// This code is in global scope, but feel free to place it in a module. 
// 
// the dictionary.ts / dictionary.js file is simply of the form
//   const dictionary=["aa","aah","aardvark","aardvarks","aarrgh"...]
// creating a global variable, *dictionary*, comprised of 264,061 English words.

// returns the union of Sets a and b. That is to say, all elements of both A and B.
const setUnion = (a: Set<string>, b: Set<string>) => {
    let union = new Set(a);
    for (var elem of Array.from(b)) {
        union.add(elem);
    }
    return union;
}

// input a string and an integer, returns the string value with '.' replacing the character at the integer.
const getSearchPattern = (word: string, x: number) => word.substring(0, x) + '.' + word.substring(x + 1);

// getCloseWordsUsing ... dictionary. Input an array of words (the "dictionary" (not the data structure)), and a string, return a set of all single-letter variations of the second argument that exist in the first.
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

// Input a word, returns a Set of English words that vary from the input value by one letter.
// Does use a global variable of an open-source list of English words linked via dictionary.ts / dictonary.js
const getCloseWords = (word: string) => getCloseWordsUsing(dictionary, word);

// Does what it says on the tin. Input a string of words and spaces, returns a Set of sentences that vary from the input value by one letter.
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

// Input any string. Returns the value stripped of punctuation; double, initial and trailing spaces; upper-case letters.
// For normalizing string input.
const cleanString = (str: string, clean: string = "", i: number = 0): string =>
    str.toLowerCase() != str || str.trim() != str ?
        cleanString(str.toLowerCase().trim(), clean, i) :
        i >= str.length ?
            clean :
            "abcdefghijklmnopqrstuvwxyz ".includes(str[i]) ?
                cleanString(str, clean + str[i], i + 1) :
                cleanString(str, clean, i + 1);

// Input any sentence (or title). Returns a Set of all English sentences that vary by a single letter.
const getTitleVariations = (title:string) => getSentenceVariations(cleanString(title));
