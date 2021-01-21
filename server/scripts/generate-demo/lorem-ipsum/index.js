const baseWords = require("./base-words");

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
}

class LoremIpsum {
  constructor({
    paragraphsMin,
    paragraphsMax,
    sentencesMin,
    sentencesMax,
    wordsMin,
    wordsMax,
    words
  }) {
    this.paragraphsMin = paragraphsMin;
    this.paragraphsMax = paragraphsMax;
    this.sentencesMin = sentencesMin;
    this.sentencesMax = sentencesMax;
    this.wordsMin = wordsMin;
    this.wordsMax = wordsMax;

    this.lastWord = "";
    if (words != null) {
      this.words = [...words];
    } else {
      this.words = [...baseWords];
    }
  }

  getRandomWord() {
    const word = [...this.words].filter((el) => el !== this.lastWord)[
      getRandomIntInclusive(0, this.words.length - 1)
    ];

    this.lastWord = word;
    return word;
  }

  getRandomClosingPunctuation() {
    const random = Math.random();
    if (random > 0.99) return "?";
    if (random > 0.98) return "!";
    return ".";
  }

  getRandomBeautifyingPunctuation() {
    const random = Math.random();
    if (random > 0.98) return ":";
    if (random > 0.95) return ";";
    if (random > 0.8) return ",";
    return "";
  }

  generateSentence() {
    const sentenceLength = getRandomIntInclusive(this.wordsMin, this.wordsMax);
    let sentence = "";
    for (let i = 0; i < sentenceLength; i++) {
      sentence += this.getRandomWord();
      if (i < sentenceLength - 3)
        sentence += this.getRandomBeautifyingPunctuation();
      sentence += " ";
    }
    sentence = sentence.trim();
    sentence = sentence.charAt(0).toUpperCase() + sentence.slice(1);
    sentence += this.getRandomClosingPunctuation();

    return sentence;
  }

  generateParagraph() {
    const sentencesCount = getRandomIntInclusive(
      this.sentencesMin,
      this.sentencesMax
    );

    let paragraph = "";
    for (let i = 0; i < sentencesCount; i++) {
      paragraph += this.generateSentence();
      paragraph += " ";
    }

    return paragraph.trim();
  }

  generateText() {
    const paragraphsCount = getRandomIntInclusive(
      this.paragraphsMin,
      this.paragraphsMax
    );

    let text = "";
    for (let i = 0; i < paragraphsCount; i++) {
      text += this.generateParagraph();
      text += "\n\n";
    }

    return text.trim();
  }
}

module.exports = { LoremIpsum, getRandomIntInclusive };
