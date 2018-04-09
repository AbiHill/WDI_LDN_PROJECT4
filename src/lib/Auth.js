class Auth {

  //rewriting functions that satellizer does for us in angular

  static logout() {
    localStorage.removeItem('token');
  }

  static setToken(token){
    localStorage.setItem('token', token);
  }

  static getToken() {
    return localStorage.getItem('token');
  }

  static getPayload() {
    // check for a token
    const token = this.getToken();
    if (!token) return false;
    // check for valid JWT token
    const parts = token.split('.');
    if (parts.length < 3) return false;
    //atob descrypts the payload (part of javascript)
    //json.parse turns it from a string into an object
    return JSON.parse(atob(parts[1]));
  }

  // we wrote this by using the satellizer docs about how isAuthenticated worked and wrote it long form ourselves.
  static isAuthenticated() {
    //check for a token
    // check for valid JWT token
    const payload = this.getPayload();
    // check that is hasn't expired
    //get current time in seconds since payload.exp is in seconds
    const now = Math.round(Date.now() / 1000);
    //check if payload time is greater than current time (so it hasn't expired yet)
    // now < payload.exp;
    return now < payload.exp;
  }

}

export default Auth;
