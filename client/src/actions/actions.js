const url = "http://localhost:8000";
const apiUrl = "http://localhost:8000/api";

export function signupAction(data) {
    return(dispatch) => {
    fetch(`${apiUrl}/register`, {
      method : "POST", 
      headers : {
        "Content-Type" : "application/json"
      },
      body : JSON.stringify(data)
    }).then(res => res.json())
    .then(data => {
      if(data.message) {
        dispatch({ type : 'SIGNUP_SUCESS', data: data.message })
      } else {
          console.log("signup error")
        dispatch({ type : 'SIGNUP_ERR' })
      } 
    })
}
}

export function loginAction(data) {
    console.log(data)
  return (dispatch) => {
    return fetch(`${apiUrl}/login`, {
      method : 'POST',
      headers : {
        "Content-Type" : "application/json"
      },
      body : JSON.stringify(data)
    })
    .then(res => res.json())
  }
}

export const getLoggedinUserData = (data) => {
  return(dispatch) => {
    dispatch({type: 'ISLOGGEDINDATA', data})
  }
}
