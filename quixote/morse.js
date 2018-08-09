var TIME_DOT = 0.1;
var TIME_DASH = 3 * TIME_DOT;
var TIME_BETWEEN_SYMBOLS = TIME_DOT;
var TIME_BETWEEN_LETTERS = TIME_DASH;
var TIME_BLANK = 7 * TIME_DOT;
var DOT = '.';
var DASH = '-';
var BLANK = ' ';

var ALPHABET = {
    'a': '.-',    'b': '-...',  'c': '-.-.', 'd': '-..',
    'e': '.',     'f': '..-.',  'g': '--.',  'h': '....',
    'i': '..',    'j': '.---',  'k': '-.-',  'l': '.-..',
    'm': '--',    'n': '-.',    'o': '---',  'p': '.--.',
    'q': '--.-',  'r': '.-.',   's': '...',  't': '-',
    'u': '..-',   'v': '...-',  'w': '.--',  'x': '-..-',
    'y': '-.--',  'z': '--..',
    '1': '.----', '2': '..---', '3': '...--', '4': '....-',
    '5': '.....', '6': '-....', '7': '--...', '8': '---..',
    '9': '----.', '0': '-----',
}


function toMorse(string) {
  // https://stackoverflow.com/questions/26059170/using-javascript-to-encode-morsecode
  return string.split('')            // Transform the string into an array: ['T', 'h', 'i', 's'...
    .map(function(e){     // Replace each character with a morse "letter"
        return ALPHABET[e.toLowerCase()] || ''; // Lowercase only, ignore unknown characters.
    })
    .join(' ')            // Convert the array back to a string.
    .replace(/ +/g, ' '); // Replace double spaces that may occur when unknow characters were in the source string.
}


function removeDiacritics(string) {
  //https://stackoverflow.com/questions/990904/remove-accents-diacritics-in-a-string-in-javascript
  return string.normalize('NFD').replace(/[\u0300-\u036f]/g, "")
}


function sleep(s) {
  // https://stackoverflow.com/questions/951021/what-is-the-javascript-version-of-sleep
  return new Promise(resolve => setTimeout(resolve, s * 1000));
}


function play(time) {
  envelope.setADSR(0.001, time, 1, 0.001);
  envelope.play(osc);
}


async function playString(string) {
  var raw = removeDiacritics(string);
  var morseString = toMorse(raw);
  for(var i = 0; i < raw.length; i++) {
    await playChar(raw[i]);
  }
}


async function playChar(c) {
  // string example: -.-.

  var morseString = toMorse(c);

  for(var i = 0; i < morseString.length; i++) {
    c = morseString[i];
    switch (c) {
      case DOT:
        balls.push(new Ball(DOT));
        play(TIME_DOT);
        await sleep(TIME_DOT + TIME_BETWEEN_SYMBOLS);
        break;
      case DASH:
        balls.push(new Ball(DASH));
        play(TIME_DASH);
        await sleep(TIME_DASH + TIME_BETWEEN_SYMBOLS);
        break;
      case BLANK:
        await sleep(TIME_BLANK);
        break;
      default:
        break;
    }
  }
  await sleep(TIME_BETWEEN_LETTERS);
}
