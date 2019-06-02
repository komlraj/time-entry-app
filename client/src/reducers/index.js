const initState = {
    timer: false,
    log: false,
    currentUser: null,
    loginUser: {},
    project: null,
    task: null,
    startTime: '00:00',
    endTime: '00:00',
    loader: '',
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
      case 'DISPLAY_TODOS': 
        return {
          ...state,
          currentUserTodos: action.data
        }
      case 'TIMER':
        return {
          ...state,
          timer: action.data
        }
      case 'LOG': 
        return {
          ...state,
          log: action.data
        }
      case 'PROJECT':
        return {
          ...state,
          project: action.data
        }
      case 'TASK':
        return {
          ...state,
          task: action.data
        }
      case 'START_TIME':
        return {
          ...state,
          startTime: action.data
        }
      case 'END_TIME':
        return {
          ...state,
          endTime: action.data
        }
      case 'LOADER': 
        return {
          ...state,
          loader: action.data
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