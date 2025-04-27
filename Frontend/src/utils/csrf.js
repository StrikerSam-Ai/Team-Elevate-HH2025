/**
 * CSRF protection utilities
 */

/**
 * Gets the CSRF token from cookies
 * Django sets a csrftoken cookie that we need to include in our requests
 * @returns {string|null} CSRF token or null if not found
 */
export const getCSRFToken = () => {
  const name = 'csrftoken=';
  const decodedCookie = decodeURIComponent(document.cookie);
  const cookieArray = decodedCookie.split(';');
  
  for (let i = 0; i < cookieArray.length; i++) {
    let cookie = cookieArray[i].trim();
    if (cookie.indexOf(name) === 0) {
      return cookie.substring(name.length, cookie.length);
    }
  }
  
  return null;
};

/**
 * Refreshes the CSRF token by making a request to the server
 * Useful when the token has expired or is missing
 * @returns {Promise<string|null>} New CSRF token or null if request fails
 */
export const refreshCSRFToken = async () => {
  try {
    // Make a GET request to a django view that will set a new CSRF cookie
    const response = await fetch('/api/csrf-refresh/', {
      method: 'GET',
      credentials: 'include',
    });
    
    if (response.ok) {
      return getCSRFToken();
    }
    
    return null;
  } catch (error) {
    console.error('Error refreshing CSRF token:', error);
    return null;
  }
};