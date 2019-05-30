const initState = {
    currentUserTodos: [],
    currentUser: null,
    fetchedUserData: {}
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
      case 'ISLOGGEDINDATA' :
        return {
          ...state,
          fetchedUserData : action.data
        }
      case 'DISPLAY_TODOS' : 
        console.log('DISPLAY_TODOS running', action.data)
        return {
          ...state,
          currentUserTodos: action.data
        }
      default:
        break;
    }
  }
  
  export default rootReducer;