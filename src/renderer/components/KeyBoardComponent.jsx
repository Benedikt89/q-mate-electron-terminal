import React, {useCallback, useEffect, useRef, useState} from "react";
import {Styles} from "../constants/styles";
import {useTranslation} from "react-i18next";
import ErrorBoundary from "./common/ErrorBoundary";
import {useTheme} from "../constants/theme";
import Keyboard from "./keyboard/Keyboard";
import clear from '../assets/clearImg.svg';

const KeyBoardComponent = ({fields, getValues, wannaGetValues}) => {
  const {t} = useTranslation()

  const theme = useTheme();
  const s = new Styles(theme);
  let [values, setValues] = useState(fields)
  let [activeIdx, setActiveIdx] = useState(0)
  let [prevIdx, setPrevIdx] = useState(0)
  const [elRefs, setElRefs] = React.useState([]);

  useEffect(() => {
    // add or remove refs
    setElRefs(elRefs => (
      Array(fields.length).fill().map((_, i) => elRefs[i] || React.createRef())
    ));
  }, [fields.length]);

  useEffect(() => {
    if (wannaGetValues) {
      let checked = values.map((v) => {
        return {
          ...v,
          error: !v.value && !!v.mandatory
        };
      })
      setValues(checked)
      let isError = checked.find(v => v.error);
      getValues(!isError ? checked : null)
    }
  }, [wannaGetValues])

  const keyRef = useRef();

  const onKeyboard = useCallback((key, deleteIdx) => {
    setActiveIdx(prevIdx);
    if (elRefs[prevIdx]) {
      elRefs[prevIdx].current.focus();
    }
    if (activeIdx < 0) return;

    setValues(vals => vals.map((v, i) => {
      if (key === 'CLEAR' && deleteIdx === i) {
        let nextVal = v.value || '';
        nextVal = nextVal.substring(0, nextVal.length - 1);
        return {
          ...v,
          value: nextVal,
          error: !nextVal && !!v.mandatory
        };
      }
      if (i !== activeIdx || key === 'CLEAR') return v;
      let nextVal = (v.value || '') + key;
      return {
        ...v,
        value: nextVal,
        error: !nextVal && !!v.mandatory
      };
    }))
  }, [prevIdx, activeIdx, elRefs])

  useEffect(() => {
    if (keyRef.current?.state?.value) {
      keyRef.current.state.value = '';
    }
  },[activeIdx]);

  return (
    <ErrorBoundary>
      <div style={{...s.keyboardWrapper}}>
        <div style={s.fieldsWrapper}>
          <div style={s.title}>{t('inputs.title')}</div>
          <div style={{...s.row, justifyContent: 'space-around', width: '100%'}}>
            {fields.map((field, idx) => {
              return (
                <div style={{...s.col, position: 'relative'}} key={field.name}>
                  <span style={{fontSize: 'small'}}>{field.name}</span>
                  <input
                    autoComplete={'off'}
                    ref={elRefs[idx]}
                    onBlur={() => setPrevIdx(idx)}
                    onFocus={() => {
                      setActiveIdx(idx);
                    }}
                    onChange={(e) => {console.log(e.nativeEvent.data)}}
                    style={{border: values[idx]?.error ? '2px solid red' : ''}}
                    type={"text"}
                    value={values[idx]?.value || ''}
                  />
                  <button style={s.fieldClear} onClick={() => onKeyboard('CLEAR', idx)}><img src={clear} alt={"<-"}/></button>
                </div>
              )
            })}
          </div>
        </div>
        <Keyboard onChange={onKeyboard} />
      </div>
    </ErrorBoundary>
  );
}

export default KeyBoardComponent;