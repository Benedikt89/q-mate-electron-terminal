let Keys = {
  REACT_APP_API_URL: 'http://93.183.195.198:5002',
  BRANCH_ID: '10002',
  LOCALE:  'uk',
  REACT_APP_TICKET_REQUEST_SPEED: 4000,
  TICKETS_PER_PAGE: 12,

  REACT_APP_ERROR_TIMEOUT: 14000,
  REACT_APP_SUCCESS_TICKET_TIMEOUT: 14000,

  primaryColor: '#4BA744',
  secondaryColor: '#000000',
  backgroundColor: '#FFFFFF',
  secondaryBackground: '#FDFDFD',
  borderColor: '#b5b5b5',
}

export const setAppKeys = (props) => {
  Keys = {...Keys, ...props}
};

export default Keys;
