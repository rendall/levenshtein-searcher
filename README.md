# levenshtein-searcher

Input a novel or movie title, get back a whole lot of those 'ruin a novel in one letter' answers.

Do it. [Do it now](https://rendall.github.io/levenshtein-searcher/)

A couple of whimsical utilities here:

`getTitleVariations` : Input a title, get one-letter variations of that title. 

e.g. 
Input 'A Heartbreaking Work of Staggering Genius'

Output:
* a heartbreaking work of swaggering genius
* a heartbreaking work of staggering genies
* a heartbreaking work of staggering genips
* a heartbreaking worm of staggering genius
...
and so on.

`getCloseWords` : Input a word, get one-letter variations of that word.

Input 'work'

Output:
* wore
* word
* work
* worm
* worn
* wort
* woad
* wold
* wood
* ward
* bord
* cord
* ford
* lord
* sord

And as an added bonus, a nifty `cleanString` utility, that normalizes a string to lowercase and strips all but alphabet and space characters.
