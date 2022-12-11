import React, { createContext, useContext, useReducer } from 'react'

const initialState = {
  authUser: null,
}

const AuthContext = createContext(undefined)

const authReducer = (state, action) => {
  switch (action.type) {
    case 'SET_USER': {
      return {
        ...state,
        authUser: action.payload,
      }
    }
    default: {
      throw new Error(`Unhandled action type`)
    }
  }
}

const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState)
  const value = { state, dispatch }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

const useAuthContext = () => {
  const ctx = useContext(AuthContext)

  if (ctx) {
    return ctx
  }

  throw new Error(`useAuthContext must be used within a AuthContextProvider`)
}

export { AuthContextProvider, useAuthContext }
