import React, {useMemo} from "react";
import {useTheme} from "../../constants/theme";
import {Styles} from "../../constants/styles";
import {useTranslation} from "react-i18next";

function KeyButton({value, onClick, onAction, language, state}) {
  const {t} = useTranslation();
  const theme = useTheme();
  const s = new Styles(theme);

  const action = useMemo(() => {
    if (value.indexOf('{') === 0) {
      let arr = value.split('')
      let last = arr.pop();
      let first = arr.shift()
      if (first === '{' && last === '}') return arr.join('')

      return null;
    }
    return null;
  }, [value])

  const clickHandler = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (action) return onAction(action)
    return onClick(value)
  }

  return (
    <button style={{...s.flex, ...s.button, padding: '.5rem', margin: '.5rem'}} onClick={clickHandler}>
      {
        !action ? value
          : action === 'language'
            ? language
            : t(`keyboard.${action}${state === action ? '_active' : ''}`, {lng: language.toLowerCase()})
      }
    </button>
  );
}


export default React.memo(KeyButton);
