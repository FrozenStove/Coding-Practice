// Count Word Frequencies
// Given a string of words, count how many times each word appears.
// Example: "the cat and the hat" → { the: 2, cat: 1, and: 1, hat: 1 }

// start out by defining a type for the class and see what methods and properties we should have
type Cache = Record<string, number>;
type WordCounterClass = {
  //   cache: Cache;
  //   input: string;
  count: () => Cache;
  //   buildCache: () => void;
};

class WordCounter implements WordCounterClass {
  private cache: Cache = {};
  private input = "";
  delimiter = " ";

  constructor(input: string) {
    this.input = input;
  }

  private buildCache() {
    const strArray = this.input.split(this.delimiter);

    strArray.forEach((word) => {
      if (this.cache[word]) {
        this.cache[word]++;
      } else {
        this.cache[word] = 1;
      }
    });
    return;
  }

  count() {
    // check to make sure the cache has been filled
    if (Object.keys(this.cache).length === 0) {
      this.buildCache();
    }
    return this.cache;
  }
}

const wordCounter = new WordCounter("the cat and the hat");

console.log(wordCounter.count());
