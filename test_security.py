import requests
import time
import json

BASE_URL = 'http://localhost:8000/companions'

def get_csrf_token(session):
    """Get CSRF token from the server."""
    # First get the CSRF cookie
    response = session.get(f'{BASE_URL}/auth/csrf/')
    if response.status_code != 200:
        print(f"Failed to get CSRF token. Status code: {response.status_code}")
        return None
    
    # Get the CSRF token from the cookie
    csrf_token = session.cookies.get('csrftoken')
    if not csrf_token:
        print("Failed to get CSRF token from cookie")
        return None
    return csrf_token

def test_login_rate_limiting():
    print("\nTesting login rate limiting...")
    session = requests.Session()
    csrf_token = get_csrf_token(session)
    
    if not csrf_token:
        print("Failed to get CSRF token")
        return
    
    headers = {
        'X-CSRFToken': csrf_token,
        'Content-Type': 'application/json',
        'Referer': 'http://localhost:8000'  # Required for CSRF
    }
    
    # Test successful login
    response = session.post(
        f'{BASE_URL}/auth/login/',
        json={
            'email': 'test@example.com',
            'password': 'Test123!'
        },
        headers=headers
    )
    print(f"Successful login response: {response.status_code}")
    print(response.text)
    
    # Test failed login attempts
    print("\nTesting failed login attempts...")
    for i in range(6):  # Try 6 times (5 is the limit)
        response = session.post(
            f'{BASE_URL}/auth/login/',
            json={
                'email': 'test@example.com',
                'password': 'wrongpassword'
            },
            headers=headers
        )
        print(f"Attempt {i+1} status: {response.status_code}")
        print(f"Response: {response.text}")
        time.sleep(1)  # Wait 1 second between attempts

def test_2fa_setup():
    print("\nTesting 2FA setup...")
    session = requests.Session()
    csrf_token = get_csrf_token(session)
    
    if not csrf_token:
        print("Failed to get CSRF token")
        return
    
    headers = {
        'X-CSRFToken': csrf_token,
        'Content-Type': 'application/json',
        'Referer': 'http://localhost:8000'  # Required for CSRF
    }
    
    # First login
    response = session.post(
        f'{BASE_URL}/auth/login/',
        json={
            'email': 'test@example.com',
            'password': 'Test123!'
        },
        headers=headers
    )
    print(f"Login response: {response.status_code}")
    print(response.text)
    
    if response.status_code != 200:
        print("Login failed, cannot proceed with 2FA setup")
        return
    
    # Setup 2FA
    response = session.post(
        f'{BASE_URL}/auth/2fa/setup/',
        headers=headers
    )
    print(f"\n2FA setup response: {response.status_code}")
    print(response.text)

def main():
    print("Starting security tests...")
    test_login_rate_limiting()
    test_2fa_setup()

if __name__ == '__main__':
    main() 