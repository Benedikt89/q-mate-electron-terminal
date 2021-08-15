import React, {useCallback, useEffect, useState} from "react";
import {Styles} from "../constants/styles";
import {useTranslation} from "react-i18next";
import TicketTable from "./TicketTable";
import {useFetchData} from "../api/useFetchData";
import {useTheme} from "../constants/theme";
import KeyBoardComponent from "./KeyBoardComponent";
import appBack from '../assets/appBackGround.svg';
import logo from "../logo.svg";

const Main = ({setMessage}) => {
  const { t } = useTranslation()
  const theme = useTheme();
  const s = new Styles(theme);

  const [level, setLevel] = useState(null);
  const [page, setPage] = useState(0);
  const [wannaGetValues, setWannaGetValues] = useState(false);
  const {data, loading, backward, submitTicket} = useFetchData(level, setMessage);

  const onSubmit = useCallback((values) => {
    setWannaGetValues(false)
    if (values)
    submitTicket(values);
  }, [submitTicket]);

  useEffect(() => {
    setPage(0)
  }, [data])

  const isInputs = data?.res?.fieldList?.length

  console.log(t('main'))
  return (
    <>
      {loading && <div className="app" style={{backdropFilter: `blur(1px)`}}>
        <img src={logo} style={{height: '10%', width: '10%'}} className="app-logo" alt="logo"/>
      </div>}
      <main style={{...s.main, backgroundImage: appBack}}>
        {appBack && <img src={appBack} style={{position: "fixed", zIndex: 1}} alt={'aaa'}/>}
        {!isInputs && <div style={s.title}>{t('main.title')}</div>}

        {data?.res?.length && <TicketTable tickets={data?.res[page] ?? []} onClick={(val) => setLevel(val)} />}
        {isInputs &&
        <KeyBoardComponent
          fields={data?.res?.fieldList ?? []}
          wannaGetValues={wannaGetValues}
          getValues={onSubmit}
        />
        }
        <div style={s.buttonsRow}>
          <Button
            disabled={!backward.length && (data?.res?.length <= 1 && page <= 0)}
            onClick={() => {
              if (!isInputs && page > 0) {
                setPage(p => p - 1)
              } else {
                setLevel(backward[backward.length - 1])
              }
            }}>
            {t('navigation.backward')}
          </Button>
          <Button
            disabled={!backward.length}
            onClick={() => isInputs ? setWannaGetValues(true) : setLevel(null)}
          >
            {t(`navigation.${isInputs ? 'register' : 'to_main_menu'}`)}
          </Button>
          <Button disabled={isInputs || data?.res?.length <= 1 || page >= data?.res?.length -1}
                  onClick={() => setPage(p => p + 1)}
          >
            {t('navigation.forward')}
          </Button>
        </div>
      </main>
    </>
  );
}

const Button = ({children, onClick, disabled}) => {
  const theme = useTheme();
  const s = new Styles(theme);
  return (
    <div style={disabled ? {...s.button, ...s.disabled} : {...s.button}}
         onClick={(e) => !disabled && onClick(e)}>
      {children}
    </div>
  )
}

export default Main;
