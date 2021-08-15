import React, {useEffect} from "react";
import {useTheme} from "../../constants/theme";
import Keys from "../../constants/appKeys";
import warning from "../../assets/warning.svg";
import receipt from "../../assets/receipt.svg";
import {Styles} from "../../constants/styles";
import {useTranslation} from "react-i18next";

function MessageComponent({setMessage, message}) {
  const {t} = useTranslation()
  const theme = useTheme();
  const s = new Styles(theme);

  const success = message && message.indexOf('success') >= 0;

  useEffect(() => {
    let timer;
    let time = !success ? Keys.REACT_APP_ERROR_TIMEOUT : Keys.REACT_APP_SUCCESS_TICKET_TIMEOUT;
    timer = setTimeout(() => {
      console.log('closeError');
      setMessage && setMessage();
    }, time);

    return () => clearTimeout(timer);
  }, [])

  return (
    <div style={{width: '100%', height: '100%', ...s.col, ...s.center}}>
      {success && <h2>{t(message)}</h2>}
      <img src={success ? receipt : warning} alt={"MESSAGE"}/>
      {success ? <h5>{t('success.ticket_additional')}</h5> : <h2>{t(message)}</h2>}
      <div style={{...s.button, minHeight: '8%', minWidth: '14%'}} onClick={() => setMessage()}>OK</div>
    </div>
  );
}

export default MessageComponent;