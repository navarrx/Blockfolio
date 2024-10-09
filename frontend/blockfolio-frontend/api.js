import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

//PARA CASA
//'http://192.168.18.13:8080/'
//PARA FACULTAD
//'http://10.51.3.194:8080/'

const API_CRYPTOCURRENCIES_BASE_URL = 'http://10.51.3.194:8080/api/cryptocurrencies';

const API_AUTH_BASE_URL = 'http://10.51.3.194:8080/api/auth';

const API_USER_BASE_URL = 'http://10.51.3.194:8080/api/users';

const API_PORTFOLIO_BASE_URL = 'http://10.51.3.194:8080/api/portfolios';

export const handleLogin = async (email, password) => {
  try {
    const response = await axios.post(`${API_AUTH_BASE_URL}/login`, {
      email,
      password,
    });

    if (response.status === 200) {
      const token = response.data.token;
      await AsyncStorage.setItem('@jwt_token', token);

      const userResponse = await getUserProfile(token);
      return { success: true, data: userResponse.data };
    } else {
      return { success: false, error: 'Invalid response status' };
    }
  } catch (error) {
    if (error.response && error.response.status === 401) {
      return { success: false, error: 'Invalid credentials' };
    } else {
      return { success: false, error: 'Something went wrong, please try again' };
    }
  }
};

export const registerUser = async (name, email, password) => {
  try {
    const response = await axios.post(`${API_AUTH_BASE_URL}/register`, {
      name,
      email,
      password,
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const getUserProfile = async (token) => {
  try {
    const response = await axios.get(`${API_USER_BASE_URL}/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    console.error('Error fetching user profile:', error);
    throw error;
  }
};

export const updateUserProfile = async (data) => {
  try {
    const token = await AsyncStorage.getItem('@jwt_token');
    const userProfileResponse = await getUserProfile(token);
    const userId = userProfileResponse.data.id;

    const response = await axios.put(`${API_USER_BASE_URL}/update?userId=${userId}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error('Failed to update profile.');
    }
  } catch (error) {
    console.error(error);
    throw new Error(error.response?.data?.message || 'Failed to update profile. Please try again.');
  }
};


export const fetchUserPortfolio = async () => {
  try {
    const token = await AsyncStorage.getItem('@jwt_token');
    const userProfileResponse = await getUserProfile(token);
    const userId = userProfileResponse.data.id;

    const response = await axios.get(`${API_PORTFOLIO_BASE_URL}/getEachCryptoValue?userId=${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getPortfolioValue = async () => {
  try {
    const token = await AsyncStorage.getItem('@jwt_token');
    const userProfileResponse = await getUserProfile(token);
    const userId = userProfileResponse.data.id;

    const response = await axios.get(`${API_PORTFOLIO_BASE_URL}/getTotalValue?userId=${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchTopCryptos = async (tab) => {
  try {
    let endpoint;
    switch(tab) {
      case 'TopGainers':
        endpoint = '/topCryptosGainers';
        break;
      case 'TopLosers':
        endpoint = '/topCryptosLosers';
        break;
      case 'TopCryptos':
      default:
        endpoint = '/topCryptos';
        break;
    }
    const response = await axios.get(`${API_CRYPTOCURRENCIES_BASE_URL}${endpoint}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};


export const fetchCryptoDetails = async (symbol) => {
  try {
  const response = await axios.get(`${API_CRYPTOCURRENCIES_BASE_URL}/getDataByCrypto?symbol=${symbol}`);
  return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchCryptoNews = async () => {
  try {
    const response = await axios.get(`${API_CRYPTOCURRENCIES_BASE_URL}/getNews`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const addCryptoToPortfolio = async (symbol, quantity) => {
  try {
    const token = await AsyncStorage.getItem('@jwt_token');
    const userProfileResponse = await getUserProfile(token);
    const userId = userProfileResponse.data.id;

    const response = await axios.post(`${API_PORTFOLIO_BASE_URL}/add?userId=${userId}&symbol=${symbol}&quantity=${quantity}`, {
      userId,
      symbol,
      quantity,
    }, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const removeCryptoFromPortfolio = async (symbol) => {
  try {
    const token = await AsyncStorage.getItem('@jwt_token');
    const userProfileResponse = await getUserProfile(token);
    const userId = userProfileResponse.data.id;

    const response = await axios.delete(`${API_PORTFOLIO_BASE_URL}/remove?userId=${userId}&symbol=${symbol}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const updateCryptoInPortfolio = async (symbol, quantity) => {
  try {
    const token = await AsyncStorage.getItem('@jwt_token');
    const userProfileResponse = await getUserProfile(token);
    const userId = userProfileResponse.data.id;

    const response = await axios.put(`${API_PORTFOLIO_BASE_URL}/update?userId=${userId}&symbol=${symbol}&quantity=${quantity}`, {
      userId,
      symbol,
      quantity,
    }, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
}
