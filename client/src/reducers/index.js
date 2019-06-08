const initState = {
    log: false,
    currentUser: null,
    loginUser: {},
    loader: '',
    timerData: null,
    tasks: null
  }
  
  const rootReducer = (state = initState, action) => {
    switch (action.type) {
      case 'SIGNUP_SUCESS':
        return {
          ...state,
          signupMessage : action.data
        }
      case 'SIGNUP_ERR':
        return {
          ...state
        }
      case 'LOGIN_SUCCESS':
        return {
          ...state,
          currentUser : action.data
        }
      case 'LOGIN_ERR':
        return {
          ...state,
          message : action.data.message
        }
      case 'ISLOGGEDINDATA':
        return {
          ...state,
          loginUser : action.data
        }
      case 'LOG': 
        return {
          ...state,
          log: action.data
        }
      case 'LOADER': 
        return {
          ...state,
          loader: action.data
        }
      case 'TIMER_DATA':
        return {
          ...state,
          timerData: action.data
        }
      case 'TASKS':
        return {
          ...state,
          tasks: action.data
        }
      default:
        break;
    }
  }
  
  export default rootReducer;