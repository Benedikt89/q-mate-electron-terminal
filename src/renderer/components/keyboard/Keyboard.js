import React, {useCallback, useState} from "react";
import {useTheme} from "../../constants/theme";
import {Styles} from "../../constants/styles";
import KeyButton from "./KeyButton";

let layOut = {
  "RU": {
    "normal": ["й ц у к е н г ш щ з х ъ", "ф ы в а п р о л д ж э", "{shift} я ч с м и т ь б ю", "{meta} {space} {language}"],
    "shift": ["Й Ц У К Е Н Г Ш Щ З Х Ъ", "Ф Ы В А П Р О Л Д Ж Э", "{shift} Я Ч С М И Т Ь Б Ю", "{meta} {space} {language}"],
    "meta": [
      "1 2 3 4 5 6 7 8 9 0",
      "@ + - _ / ! ? = № #",
      "$ % : & * ; ( ) < > | ~",
      "{meta} {space} {language}"
    ]
  },
  "EN": {
    "normal": ["q w e r t y u i o p", "a s d f g h j k l", "{shift} z x c v b n m", "{meta} {space} {language}"],
    "shift": ["Q W E R T Y U I O P", "A S D F G H J K L", "{shift} Z X C V B N M", "{meta} {space} {language}"],
    "meta": [
      "1 2 3 4 5 6 7 8 9 0",
      "@ + - _ / ! ? = № #",
      "$ % : & * ; ( ) < > | ~",
      "{meta} {space} {language}"
    ]
  },
  "UA": {
    "normal": ["й ц у к е н г ш щ з х ъ", "ф ы в а п р о л д ж э", "{shift} я ч с м и т ь б ю", "{meta} {space} {language}"],
    "shift": ["Й Ц У К Е Н Г Ш Щ З Х Ъ", "Ф Ы В А П Р О Л Д Ж Э", "{shift} Я Ч С М И Т Ь Б Ю", "{meta} {space} {language}"],
    "meta": [
      "1 2 3 4 5 6 7 8 9 0",
      "@ + - _ / ! ? = № #",
      "$ % : & * ; ( ) < > | ~",
      "{meta} {space} {language}"
    ]
  },
}

// fetch(`${process.env.PUBLIC_URL}/locales/keyboard.json`)
//   .then((response) => response.json())
//   .then(res => {
//     if (res.RU) {
//       layOut = {...layOut, ...res}
//     }
//   })
import keys from '../../assets/locales/keyboard.json';
console.log(keys)

function Keyboard({onChange}) {
  const theme = useTheme();
  const s = new Styles(theme);
  const [currentLanguage, setCurrentLanguage] = useState("EN");
  const [currentState, setCurrentState] = useState('normal');

  const actionHandler = useCallback((val) => {
    if (val === 'space') return onChange(' ');
    if (val === 'language') return setCurrentLanguage(prev => prev === 'EN' ? 'UA' : prev === 'UA' ? 'RU' : 'EN');
    setCurrentState(state => state === val ? 'normal' : val);
  }, [onChange])

  return (
    <div style={{...s.keyboard}}>
      {layOut[currentLanguage][currentState]
        ? layOut[currentLanguage][currentState].map((row) => {
          const keysArray = row.split(' ');
          const spaceIdx = keysArray.indexOf('{space}');
          return (
            <div
              key={row}
              style={{
                ...s.keyboardRow,
                gridTemplateColumns: spaceIdx > 0
                  ? '12% 40% 12%'
                  : `repeat(auto-fill, ${100 / keysArray.length}%)`
              }}
            >
              {keysArray.map(key => {
                return (
                  <KeyButton key={key} value={key} onClick={onChange} onAction={actionHandler}
                             language={currentLanguage} state={currentState}/>
                )
              })}
            </div>
          )
        })
        : null}
    </div>
  );
}


export default Keyboard;
