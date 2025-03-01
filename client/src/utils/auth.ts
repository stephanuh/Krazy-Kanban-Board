import { JwtPayload, jwtDecode } from 'jwt-decode';
import type { UserData } from '../interfaces/UserData';

class AuthService {

  // Return the decoded token
  getProfile(): UserData | null {
    const token = this.getToken();

    if (token) {
      try {
        const decodedToken = jwtDecode<UserData>(token);
        return decodedToken;
      } catch (error) {
        console.error("Error decoding the token:", error);
      }
    }
    return null;
  }

  // Return a value that indicates if the user is logged in
  loggedIn(): boolean {
    const token = this.getToken();

    if (token) {
      const decodedToken = this.getProfile();
      if (decodedToken) {
        return !this.isTokenExpired(token);
      }
    }
    return false;
  }

  // Return a value that indicates if the token is expired
  isTokenExpired(token: string): boolean {
    try {
      const decoded = jwtDecode<JwtPayload>(token);
      if (decoded?.exp && decoded?.exp < Date.now() / 1000) {
        return true;
      }
    } catch (error) {
      console.error("Failed to determine if the login access is current: ", error);
      return true;
    }
    return false;
  }

  // Return the token
  getToken(): string {
    let loggedUser = '';
    
    try {
      loggedUser = localStorage.getItem('id_token') || '';
    } catch (error) {
      console.error("Error reading access token:", error);
    }
    return loggedUser;
  }

  // Set the token to localStorage & redirect to the home page
  login(idToken: string) {
    try {
      localStorage.setItem('id_token', idToken);
    } catch (error) {
      console.error("Error storing access token:", error);
    }
    window.location.assign('/');
  }

  // Remove the token from localStorage & redirect to the login page
  logout() {
    try {
      localStorage.removeItem('id_token');
    } catch (error) {
      console.error('Error removing access token from local storage:', error);
    }
  }
}

export default new AuthService();
