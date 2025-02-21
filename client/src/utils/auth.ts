import { JwtPayload, jwtDecode } from 'jwt-decode';
import type { UserData } from '../interfaces/UserData';

class AuthService {
  getProfile(): UserData | null {  // TODO: return the decoded token
    const token = this.getToken();

    if (token) {
      try {
        const decoded = jwtDecode<UserData>(token);
        return decoded;
      } catch (err) {
        console.error('Error decoding token', err);
      }
    }
    return null;
  };

  loggedIn(): boolean {// TODO: return a value that indicates if the user is logged in
    const token = this.getToken();
    if (token) {
      const decoded =this.getProfile();
      if (decoded) {
        return !this.isTokenExpired(token);
      }
    }
    return false
  };
  
  isTokenExpired(token: string): boolean {// TODO: return a value that indicates if the token is expired
    try {
      const decoded = jwtDecode<JwtPayload>(token);
      if (decoded?.exp && decoded?.exp < Date.now() / 1000) {
        return true;
      }
    } catch (err) {
      console.error('Failed for current login access', err);
      return true;
    }
    return false;
  };

  getToken(): string {// TODO: return the token
    let loggedInUser = '';
    try {
      loggedInUser = localStorage.getItem('id_token') || '';
    } catch (err) {
      console.error('Failed to get token', err);
    }
    return loggedInUser;
  }

  login(idToken: string) { // TODO: set the token to localStorage & redirect to the home page
    try {
      localStorage.setItem('id_token', idToken);
    } catch (err) {
      console.error('Failed to set token', err);
    }
    window.location.assign('/');
  };

  logout() {// TODO: remove the token from localStorage & redirect to the login page
    try {
      localStorage.removeItem('id_token');
    } catch (err) {
      console.error('Failed to remove token', err);
    }
  }
};

export default new AuthService();
