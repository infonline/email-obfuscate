/* globals WebFont */
import EmailObfuscate from '../src/emailObfuscate';

var fontList = [
  'Arial',
  'Courier New',
  'Lucida Bright',
  'Palatino',
  'PT Serif',
  'Trebuchet MS',
  'Times New Roman',
  'Verdana'
];

var webFonts = [
  'Abril Fatface',
  'Arvo',
  'Droid Sans',
  'Fira Sans',
  'Josefin Sans',
  'Lato',
  'Old Standard TT',
  'Open Sans',
  'Roboto',
  'Ubuntu',
  'Volkhov'
];

WebFont.load({
  google: {
    families: webFonts
  },
  active: () => {
    fontList = fontList.concat(webFonts);
    emailObfuscate();
    generateSelection();
  }
});

var emailObfuscate = () => {
  var el = document.getElementById('obfuscated');
  EmailObfuscate(el, {});
};

var generateStyle = (fontFamily) => {
  var css = `.example__a { font-family: "${fontFamily}" }`;
  var style = document.createElement('style');
  style.appendChild(document.createTextNode(css));
  var exisitingStyle = document.head.getElementsByTagName('style');
  if (exisitingStyle.length > 0) {
    document.head.removeChild(exisitingStyle[0]);
  }
  document.head.appendChild(style);
};

var fontSelectionEl = document.getElementById('fontSelection');

var generateSelection = () => {
  while (fontSelectionEl.firstChild) {
    fontSelectionEl.removeChild(fontSelectionEl.firstChild);
  }
  fontList.map((font) => {
    var el = document.createElement('option');
    el.innerHTML = font;
    el.value = font;
    fontSelectionEl.appendChild(el);
  });
};

var updateSource = (input, output) => {
  var htmlStr = document.getElementById(input).outerHTML;
  var clearHtml = document.getElementById(output);
  clearHtml.innerText = htmlStr;
};

var updateSources = () => {
  updateSource('clear', 'clearHtml');
  updateSource('obfuscated', 'obfuscatedHtml');
};

fontSelectionEl.addEventListener('change', (e) => {
  var fontFamily = e.target.value;
  generateStyle(fontFamily);
  emailObfuscate();
});

window.addEventListener('resize', () => {
  emailObfuscate();
});

emailObfuscate();
generateSelection();
updateSources();
