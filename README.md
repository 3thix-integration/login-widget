# Installing

To install you must include in your ``package.json`` file on the dependencies section:
```json
{
  // ...
  "dependencies": {
    // ...
    "login-3thix": "git+ssh://git@github.com:3thix/login-widget.git#v1.0.7"
  }
  // ...
}
```

and run ``yarn`` or ``npm install``.

# Usage

```tsx
import LoginWidget from 'login-3thix/dist';

const url = "https://sandbox-api.3thix.com"

const YourComponent = () => {
  function handleCallback(token:string) {
    // ...
  }

  return (
    <LoginWidget callback={handleCallback} url={url} />
  )
}

export default YourComponent;
```

# Requests

This is all the requests configured in the widget, if you want to create your own widget, please, use this login system.

Base URL
- Sandbox: https://sandbox-api.3thix.com
- Production: https://api.3thix.com

### Sign up
To create a new account you can use:

```
[POST] /entity/user/sign-up
{
  first_name:string,
  last_name:string,
  email:string,
  password:string,
}
```

### Get authorization pin by email

To perform login and passwords updates you will need to get an authorization pin and to receive this pin in your email, you must request:
```
[POST] /entity/user/auth/pin
{
  email:string,
}
```

### Update password

You will use this endpoint to reset users password. You first of all will call the ``/entity/user/auth/pin`` endpoint, and after that send the pin, email and the new password to this endpoint:
```
[POST] /entity/user/password/update
{
  pin:string,
  email:string,
  password:string,
}
```

### Login

To perform a login you first of all will call the ``/entity/user/auth/pin`` endpoint, and after that send the pin, email and password to this endpoint:
```
[POST] /entity/user/auth
{
  pin:string,
  email:string,
  password:string,
}
```

### Google SSO login

Because SSO already certify users authenticity, you only need to redirect the user to the login page sending in the queryParams the endpoint you want to receive the token when users finish his authentication:
```
[GET] /entity/user/auth/google/signin?callbackUrl=<url-to-get-token-back>
```
