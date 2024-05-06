import { AppDispatch } from "../store";
import { LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT, UPDATE_REQUEST, UPDATE_SUCCESS } from "../types";
export interface UserProfileModel {
        id?: number,
        firstName: string,
        lastName: string,
        userName: string,
        password: string,
        phone: number
}
export interface UserLoginModel {
  userName: string,
  password: string,
}

export const loginRequest = () => ({ 
    type: LOGIN_REQUEST 
});
export const loginSuccess = (user: UserLoginModel) => ({ 
    type: LOGIN_SUCCESS, payload: user 
});
export const logout = () => ({ 
    type: LOGOUT 
});
export const updateRequest = () => ({
    type: UPDATE_REQUEST
});
export const updateSuccess = (user : UserProfileModel) => ({
    type: UPDATE_SUCCESS, payload: user
});

export const loginUser = (requestUser: UserLoginModel) => {
    return async (dispatch: AppDispatch) => {
      dispatch(loginRequest());
      try {
        const response = await fetch("http://192.168.1.34:4000/users");
        const text = await response.text();
        const users = JSON.parse(text);
  
        const user = users.find((u: UserLoginModel) => u.userName === requestUser.userName && u.password === requestUser.password);
        console.log('gelen user: ', user);
  
        if (user) {
          dispatch({ type: LOGIN_SUCCESS, payload: user });
          dispatch({ type: UPDATE_SUCCESS, payload: user });
        } else {
          throw new Error('Kullanıcı bulunamadı');
        }
  
      } catch (error: any) {
        console.log('catch error: ', error);
        dispatch({ type: LOGIN_FAILURE, payload: error.message });
      }
    };
  };
  export const getUserById = async (userId: number) => {
    try {
      const response = await fetch(`http://192.168.1.34:4000/users/${userId}`);
      const userData = await response.json();  
      return userData;  
    } catch (error: any) {
      console.error('API error:', error);
      throw new Error('Failed to fetch user'); 
    }
  };
  export const updateProfile = (profileData : UserProfileModel, userId:number) => async (dispatch : AppDispatch) => {
    dispatch(updateRequest());
    try {
      const response = await fetch(`http://192.168.1.34:4000/users/${userId}`, {
        method: 'PATCH', 
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(profileData),
      });
      const updatedProfile = await response.json();
      console.log("updateprofile: ",updatedProfile)
      console.log("profileprofile: ",profileData)
      dispatch({type: UPDATE_SUCCESS, payload: updatedProfile});
    } catch (error) {
        console.log('userid: ',userId)
      console.log("catch error: ",error)
    }
  };
