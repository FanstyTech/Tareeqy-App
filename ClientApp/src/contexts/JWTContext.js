import { createContext, useEffect, useReducer } from 'react';
import PropTypes from 'prop-types';
// utils
import axios from '../utils/axios';
import { isValidToken, setSession } from '../utils/jwt';

// ----------------------------------------------------------------------

const initialState = {
  isAuthenticated: false,
  isInitialized: false,
  user: null
};

const handlers = {
  INITIALIZE: (state, action) => {
    const { isAuthenticated, user } = action.payload;
    return {
      ...state,
      isAuthenticated,
      isInitialized: true,
      user
    };
  },
  LOGIN: (state, action) => {
    const { user } = action.payload;

    return {
      ...state,
      isAuthenticated: true,
      user
    };
  },
  LOGOUT: (state) => ({
    ...state,
    isAuthenticated: false,
    user: null
  }),
  REGISTER: (state, action) => {
    const { user } = action.payload;

    return {
      ...state,
      isAuthenticated: true,
      user
    };
  }
};

const reducer = (state, action) => (handlers[action.type] ? handlers[action.type](state, action) : state);

const AuthContext = createContext({
  ...initialState,
  method: 'jwt',
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
  register: () => Promise.resolve()
});

AuthProvider.propTypes = {
  children: PropTypes.node
};

function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const initialize = async () => {
      try {
        const accessToken = window.localStorage.getItem('accessToken');

        if (accessToken && isValidToken(accessToken)) {
          setSession(accessToken);

          // const response = await axios.get('User/MyAccount');
          // try {
          //   const { Authorization } = config.headers;

          //   if (!Authorization) {
          //     return [401, { message: 'Authorization token missing' }];
          //   }

          //   const accessToken = Authorization.split(' ')[1];
          //   const data = verify(accessToken, JWT_SECRET);
          //   const userId = typeof data === 'object' ? data?.userId : '';
          //   const user = users.find((_user) => _user.id === userId);

          //   if (!user) {
          //     return [401, { message: 'Invalid authorization token' }];
          //   }

          //   return [200, { user }];
          // } catch (error) {
          //   console.error(error);
          //   return [500, { message: 'Internal server error' }];
          // }
          const user2 = {
            id: 'c1c07e5a-31ad-4e62-a9c7-539c704196c1',
            displayName: 'حسام فرج الله',
            email: 'mrhusamfa@gmail.com',
            password: 'P@ssw0rd',
            photoURL: '/static/mock-images/avatars/avatar_default.jpg',
            phoneNumber: '+40 777666555',
            country: 'United States',
            address: '90210 Broadway Blvd',
            state: 'California',
            city: 'San Francisco',
            zipCode: '94116',
            about: 'Praesent turpis. Phasellus viverra nulla ut metus varius laoreet. Phasellus tempus.',
            role: 'admin',
            isPublic: true
          };

          // const { user } = response.data;

          dispatch({
            type: 'INITIALIZE',
            payload: {
              isAuthenticated: true,
              user: user2
            }
          });
        } else {
          dispatch({
            type: 'INITIALIZE',
            payload: {
              isAuthenticated: false,
              user: null
            }
          });
        }
      } catch (err) {
        console.error(err);
        dispatch({
          type: 'INITIALIZE',
          payload: {
            isAuthenticated: false,
            user: null
          }
        });
      }
    };

    initialize();
  }, []);

  const login = async (email, password) => {
    const response = await axios.post('User/Login', {
      Email: email,
      Password: password
    });
    const { code, data, message, status } = response.data;
    if (!status) {
      console.log('message', message);
      throw new Error(message);
    } else {
      // const { TokenKey, user } = data;

      const user = {
        id: data?.Id,
        displayName: data?.NickName,
        email: data?.Email,
        password: 'P@ssw0rd',
        photoURL: '/static/mock-images/avatars/avatar_default.jpg',
        phoneNumber: '+40 777666555',
        country: 'United States',
        address: '90210 Broadway Blvd',
        state: 'California',
        city: 'San Francisco',
        zipCode: '94116',
        about: 'Praesent turpis. Phasellus viverra nulla ut metus varius laoreet. Phasellus tempus.',
        role: 'admin',
        isPublic: true
      };
      setSession(data.TokenKey);
      dispatch({
        type: 'LOGIN',
        payload: {
          user
        }
      });
    }
  };

  const register = async (email, password, firstName, lastName) => {
    const response = await axios.post('/api/account/register', {
      email,
      password,
      firstName,
      lastName
    });
    const { accessToken, user } = response.data;

    window.localStorage.setItem('accessToken', accessToken);
    dispatch({
      type: 'REGISTER',
      payload: {
        user
      }
    });
  };

  const logout = async () => {
    setSession(null);
    dispatch({ type: 'LOGOUT' });
  };

  const resetPassword = () => {};

  const updateProfile = () => {};

  return (
    <AuthContext.Provider
      value={{
        ...state,
        method: 'jwt',
        login,
        logout,
        register,
        resetPassword,
        updateProfile
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
