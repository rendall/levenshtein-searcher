"use strict";
/// <reference path="dictionary.ts"/>
var setUnion = function (a, b) {
    var union = new Set(a);
    for (var _i = 0, _a = Array.from(b); _i < _a.length; _i++) {
        var elem = _a[_i];
        union.add(elem);
    }
    return union;
};
var getSearchPattern = function (word, x) { return word.substring(0, x) + '.' + word.substring(x + 1); };
var getCloseWordsUsing = function (dict, word) {
    if (word.toLowerCase() != word)
        return getCloseWordsUsing(dict, word.toLowerCase());
    var wordLength = word.length;
    var searchSpace = dict.filter(function (entry) { return entry.length == wordLength; });
    var wordsReplacingOneLetter = function (word, x) {
        if (x >= word.length || x < 0) {
            throw Error("invalid index " + x + " in wordsReplacingOneLetter");
        }
        var wPattern = getSearchPattern(word, x);
        var pattern = new RegExp(wPattern);
        return searchSpace.filter(function (w) { return w.match(pattern); });
    };
    var concatUnique = function (a, b) {
    };
    var closeWords = function (i, w) {
        if (i === void 0) { i = 0; }
        if (w === void 0) { w = []; }
        return i >= word.length ? w : closeWords(i + 1, wordsReplacingOneLetter(word, i).concat(w));
    };
    return new Set(closeWords());
};
var getCloseWords = function (word) { return getCloseWordsUsing(dictionary, word); };
var getSentenceVariations = function (sentence, i, varis) {
    if (i === void 0) { i = 0; }
    if (varis === void 0) { varis = new Set(); }
    if (sentence.indexOf('  ') >= 0)
        return getSentenceVariations(sentence.trim().replace('  ', ' '), i, varis);
    var words = sentence.split(' ');
    if (i >= words.length)
        return varis;
    var varyWord = words[i];
    var closeWords = Array.from(getCloseWords(varyWord));
    var assembleSentences = function (words, closeWords, i, j, sentences) {
        if (j === void 0) { j = 0; }
        if (sentences === void 0) { sentences = new Set(); }
        if (j >= closeWords.length)
            return sentences;
        var leftWords = words.filter(function (val, idx) { return idx < i; });
        var rightWords = words.filter(function (val, idx) { return idx > i; });
        var ourSentence = (leftWords.join(' ') + (" " + closeWords[j] + " ") + rightWords.join(' ')).trim();
        return assembleSentences(words, closeWords, i, j + 1, sentences.add(ourSentence));
    };
    return getSentenceVariations(sentence, i + 1, setUnion(varis, assembleSentences(words, closeWords, i)));
};
var cleanString = function (str, clean, i) {
    if (clean === void 0) { clean = ""; }
    if (i === void 0) { i = 0; }
    return str.toLowerCase() != str || str.trim() != str ?
        cleanString(str.toLowerCase().trim(), clean, i) :
        i >= str.length ?
            clean :
            "abcdefghijklmnopqrstuvwxyz ".includes(str[i]) ?
                cleanString(str, clean + str[i], i + 1) :
                cleanString(str, clean, i + 1);
};
var getTitleVariations = function (title) { return getSentenceVariations(cleanString(title)); };