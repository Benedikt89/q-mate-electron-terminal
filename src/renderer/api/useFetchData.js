import {useEffect, useState} from "react";
import API from "./API";
import Keys from "../constants/appKeys";
import {useTranslation} from "react-i18next";

const transformData = (data) => {
  let size = 3;
  let res = [[]]
  data.forEach((d, i) => {
    let idx = i + 1 <= (res.length) * size ? res.length - 1 : res.length;
    if (!res[idx]) res[idx] = [];
    res[idx].push(d)
  })

  return res;
}

export const useFetchData = (parentId, setMessage) => {
  const [backward, setBackward] = useState([]);
  const [currentQuery, setCurrentQuery] = useState();
  const [prevQuery, setPrevQuery] = useState();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({});
  const [currentServiceFields, setCurrentServiceFields] = useState(null);
  const { i18n } = useTranslation()
  const lang = 'UK'//i18n.language;

  useEffect(() => {
    if (parentId === currentQuery) return;
    const fetchData = async () => {
      setLoading(true);
      try {
        let currentItem = null;
        if (parentId && data.res?.length && data.res[0].length) {
          data.res.forEach(arr => {
            let it = arr.find(data => data.id === parentId);
            if (it) {
              currentItem = it;
            }
          })
        }
        if (currentItem && currentItem?.type === 'SERVICE') {
          const fieldsRes = await API.post('/api/queue/read/service', {serviceId: currentItem.id})
          if (fieldsRes.data?.res?.fieldList?.length) {
            const toSet = {...fieldsRes.data, service:currentItem }
            setData(toSet);
            return;
          }
          const response = await API.post(`/api/queue/create/ticket`,
            currentItem,
            {headers: {"Content-Language": lang.toUpperCase()}}
          );
          console.log(response)
          //setData({});
        } else {
          const res = await API.post(`/api/terminal/read/service-node/list`,
            {
              branchId: +Keys.BRANCH_ID,
              parentId: parentId,
            },
            {headers: {"Content-Language": lang.toUpperCase()}}
          );
          setData({...res.data, res: transformData(res.data.res)});
          setBackward(
            (prev) =>
              !parentId ? []
                : prevQuery === parentId ? prev.filter(q => +q !== +parentId)
                : [...prev, currentQuery]
          )
          setPrevQuery(currentQuery)
          setCurrentQuery(parentId)
        }
      } catch (e) {
        setMessage('error.global')
        console.log(e)
        if (lang !== 'uk') {
          i18n.changeLanguage('uk')
        }
        return fetchData();
      }
    };
    fetchData().finally(() => setLoading(false));
  }, [parentId, currentQuery, lang]);

  useEffect(() => {
    const submitTicket = () => {
      setLoading(true)
      // console.log('data ==> ', data)
      // console.log('fields => ', currentServiceFields)
      if (!currentServiceFields || !data) return;
      API.post(`/api/queue/create/ticket`,
        {
          branchId: data.service.branchId,
          serviceId: data.service.id,
          ticketFieldList: currentServiceFields.map(f => ({id: f.id, value: f.value || ''}))
        },
        {headers: {"Content-Language": lang.toUpperCase()}}
      ).then(response => {
        console.log(response.data)
        setData({});
        setCurrentServiceFields(null)
        setLoading(false)
        setMessage('success.ticket_created')
      }).catch(e => {
        setCurrentServiceFields(null)
        setLoading(false)
        setMessage('success.ticket_created')
        console.log(e)
      })
    };
    if (currentServiceFields) submitTicket();
  }, [currentServiceFields])

  // useEffect(() => {
  //   let timer;
  //   if (status === 'submitted') {
  //     timer = setTimeout(() => {
  //       setStatus(() => 'idle');
  //     }, +Keys.TICKET_CALLING_VISUAL_MS_LENGTH);
  //   }
  //   return () => clearTimeout(timer);
  // }, [status])

  return {data, loading, prevQuery, backward, submitTicket: setCurrentServiceFields};
};