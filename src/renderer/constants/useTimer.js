import {useEffect, useMemo, useState} from "react";
const moment = require("moment");
const i18n = require('i18next');
require('moment/locale/ru');
require('moment/locale/en-gb');
require('moment/locale/uk');

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export const useClock = () => {
  const [clock, setClock] = useState(moment());
  const currentLanguage = i18n.language;

  useEffect(() => {
    let id = setInterval(() => {
      setClock(moment());
    }, 1000);

    return () => clearInterval(id);
  }, []);

  const timeString = useMemo(() => {
      try {
        let weekDayName = clock.locale(currentLanguage).format('dddd')
        let date = clock.locale(currentLanguage).format('DD')
        let month = clock.locale(currentLanguage).format('MMMM')
        let time = clock.locale(currentLanguage).format('hh:mm:ss')

        return `${capitalizeFirstLetter(weekDayName)}, ${date} ${capitalizeFirstLetter(month)}, ${time}`
      } catch (e) {
        return '';
      }
    },
    [currentLanguage, clock]
  )

  return {clock, timeString};
}
