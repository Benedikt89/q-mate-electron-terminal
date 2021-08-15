import Keys from "./appKeys";

export class Styles {
  primaryColor = Keys.primaryColor || '#4BA744';
  secondaryColor = Keys.secondaryColor || '#000000';
  backgroundColor = Keys.backgroundColor || '#FFFFFF';
  secondaryBackground = Keys.secondaryBackground || '#FDFDFD';
  borderColor = Keys.borderColor || '#b5b5b5';

  constructor(props) {
    if (props) {
      this.primaryColor = props.primaryColor ?? this.primaryColor;
      this.secondaryColor = props.secondaryColor ?? this.secondaryColor;
      this.backgroundColor = props.backgroundColor ?? this.backgroundColor;
      this.secondaryBackground = props.secondaryBackground ?? this.secondaryBackground;
      this.borderColor = props.borderColor ?? this.borderColor;
    }
  };

  flex={
    boxSizing: 'border-box',
    display: 'flex',
  }
  row={
    ...this.flex,
    flexDirection: 'row'
  }
  col={
    ...this.flex,
    flexDirection: 'column'
  }
  appColorCell={
    backgroundColor: this.primaryColor,
    color: this.backgroundColor,
  }

  center={
    justifyContent: 'center',
    alignItems: 'center',
  }
  app = {
    height: '100vh',
    width: '100%',
    backgroundColor: this.backgroundColor,
    ...this.col
  };
  header = {
    display: 'grid',
    gridTemplateColumns: '30% 1fr 30%',
    gridTemplateRows: '1fr',
    alignItems: 'center',
    width: '100%',
    height: '10%',
    left: '0px',
    top: '0px',
    backgroundColor: this.backgroundColor,
    boxShadow: `0px 1px 0px ${this.borderColor}`,
  };
  headerText = {
    display: 'flex',
    justifyContent: 'center',
    fontFamily: 'Open Sans',
    fontStyle:' normal',
    fontWeight:' bold',
    fontSize: '1.3rem',
    lineHeight: '1',

    fontFeatureSettings: 'pnum on, lnum on',
    color: this.secondaryColor,
  };
  headerIcons = {
    ...this.row,
    justifyContent: 'flex-end'
  }
  main = {
    ...this.col,
    alignItems: 'center',
    width: '100%',
    height: '90%'
  };

  title={
    minHeight: '10%',
    width: '100%',
    fontSize: 'larger',
    fontWeight: 'bolder',
    ...this.row,
    ...this.center
  };

  table={
    boxSizing: 'border-box',
    paddingBottom: '7%',
    display: 'grid',
    gridGap: '5%',
    alignItemsItems: 'stretch',
    justifyItems: 'stretch',
    gridTemplateRows: '1fr 1fr 1fr',
    minWidth: '90%',
    minHeight: '75%',
    maxHeight: '75%',
    overflow: 'hidden',
  };
  keyboardWrapper={
    zIndex: 10,
    ...this.col,
    paddingBottom: '7%',
    alignItems: 'center',
    justifyContent: 'space-around',
    minWidth: '90%',
    minHeight: '85%',
    maxHeight: '85%',
    overflow: 'hidden',
  }
  fieldsWrapper = {
    ...this.col,
    ...this.appColorCell,
    position: 'relative',
    justifyContent: 'space-evenly',
    minHeight: '45%',
    maxHeight: '45%',
    fontSize: '30px',
    paddingBottom: '4%',
    width: '100%'
  }
  fieldClear={
    ...this.flex,
    position: 'absolute',
    right: '-2%',
    top: '42%',
    backgroundColor: 'rgba(239, 239, 239, 0)',
    border: 'none'
  }
  fieldInput={
    backgroundColor: this.backgroundColor,
    color: this.secondaryColor,
  }
  keyboard={
    minWidth: '99%',
    maxHeight: '25%',
    ...this.col,
    ...this.center,
  };
  keyboardRow = {
    ...this.flex,
    display: 'grid',
    width: '100%',
    gridTemplateColumns: 'repeat(auto-fill, 10%)'
  }

  tableCell={
    cursor: 'pointer',
    position: 'relative',
    minWidth: '25%',
    minHeight: '25%',
    ...this.col,
    ...this.center,
    color: this.backgroundColor,
    justifyContent: 'space-evenly',
    WebkitBoxShadow: '0px 8px 18px -4px #000000',
    boxShadow: '0px 8px 18px -10px #000000',
    zIndex: '12',
    margin: '2%'
  };
  cellBackGround = {
    ...this.appColorCell,
    border: '1px solid #EEF2F5',
    position: 'absolute',
    zIndex: '2',
    width: '100%',
    height: '100%',
    top: '-5px',
    right: '-5px',
  }
  buttonsRow={
    width: '90%',
    display: 'grid',
    minHeight: '10%',
    gridGap: '5%',
    gridTemplateColumns: '25% 1fr 25%',
    zIndex: 10
  };
  button = {
    cursor: 'pointer',
    display: 'flex',
    ...this.appColorCell,
    ...this.center,
    minHeight: '25px'
  }
  disabled = {
    color: this.backgroundColor,
    backgroundColor: this.borderColor
  }
  modalBg={
    position: 'absolute',
    display: 'flex',
    ...this.center,
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: `rgba(0, 0, 0, 0.85)`
  };
  modalItem={
    display: 'flex',
    height: '45%',
    width: '45%',
    ...this.center,
    ...this.appColorCell,
    fontFamily: 'Rubik',
    fontStyle:' normal',
    fontWeight:' bold',
    fontSize: '59px',
  };
  modalContent={
    height: '80%',
    width: '80%',
    display: 'grid',
    gridTemplateColumns: '1fr 30%',
    gridTemplateRows: '1fr 1fr',
  };
  modalText={
    ...this.col,
    ...this.center,
  }

  modalUpper={
    textTransform:' uppercase',
  }
}