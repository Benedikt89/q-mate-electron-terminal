import React, {useCallback, useState} from "react";
import {Styles} from "../constants/styles";
import headerLogo from "../assets/headerLogo.svg";
import {useTheme} from "../constants/theme";
import {useClock} from "../constants/useTimer";
import ua from '../assets/ua.svg'
import us from '../assets/uk.svg'
import ru from '../assets/ru.svg'
import {useTranslation} from "react-i18next";
import {LANGUAGES} from "../constants/i18n";

const LANGUAGE_LIST = Array.from(LANGUAGES.entries())

function Header() {
  const {timeString} = useClock();
  const { i18n } = useTranslation()
  const [loading, setLoading] = useState(false)
  const theme = useTheme();
  const s = new Styles(theme);
  let imagePath = headerLogo;

  const changeLanguage = useCallback(
    languageCode => {
      if (loading) return;
      setLoading(true)
      i18n.changeLanguage(languageCode, () => void setLoading(false))
    },
    [i18n, loading]
  )

  return (
    <header style={{...s.header}}>
      <div style={{...s.headerText}}>
        <img src={imagePath} alt={"LOGO"} style={{maxWidth: '70%'}}/>
      </div>
      <div style={{...s.headerText}}>{timeString}</div>
      <div style={{...s.headerIcons}}>
        {LANGUAGE_LIST.map(([languageCode]) =>
          <img
            alt={languageCode}
            style={{
              width: '12%',
              height: '12%',
              margin: '0 1rem',
              borderRadius: '50%',
              border: languageCode ===  i18n.language ? '1px solid blue' : ''
            }}
            src={languageCode === 'ru' ? ru : languageCode === 'en' ? us : ua}
               onClick={() => changeLanguage(languageCode)} key={languageCode}
          />
        )}
      </div>
    </header>
  );
}

export default Header;
