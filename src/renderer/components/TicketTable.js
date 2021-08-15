import React from "react";
import {Styles} from "../constants/styles";
import {useTheme} from "../constants/theme";
import {useTranslation} from "react-i18next";

const TicketTable = ({tickets, onClick}) => {
  const theme = useTheme();
  const s = new Styles(theme);
  const {t} = useTranslation();

  const style = {
    ...s.table, gridTemplateColumns: tickets.length > 6
      ? '1fr 1fr 1fr' : tickets.length > 3 ? '1fr 1fr' : '1fr'
  }
  if (tickets.length <= 3) {
    style.maxWidth = '45%';
    style.minWidth = '45%';
  }
  const isService = (ticket) => ticket.type === 'SERVICE';

  const getFolderStyle = (idx) => ({
    ...s.cellBackGround,
    top: -(idx * 3) + 'px',
    right: -(idx * 3) + 'px',
    zIndex: -(idx * 2)
  })

  const FOLDER = [1, 2]
  return (
    <div style={style}>
      {tickets.map(ticket => {
        return (
          <div key={ticket.id} style={{...s.tableCell}} onClick={() => onClick(ticket.id)}>
            {
              !isService(ticket) &&
              FOLDER.map((f) => (
                <div key={f} style={getFolderStyle(f)}>
              </div>
              ))
            }
            <div style={getFolderStyle(0)}> </div>
            <span style={{zIndex: '25', maxWidth: '80%'}}>{ticket.title ? ticket.title : ticket.localeTitleKey}</span>
            <span style={{zIndex: '25', fontSize: 'smaller', maxWidth: '80%'}}>
              {t(`main.tickets.${isService(ticket) ? 'service_bottom' : 'node_bottom'}`)}
            </span>
          </div>
        )
      })}
    </div>
  );
};


export default TicketTable;