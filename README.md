# Login 3thix widget

[![NPM Version](https://img.shields.io/npm/v/3thix-login-widget)](https://www.npmjs.com/package/3thix-login-widget)


<img src="https://github.com/3thix-integration/login-widget/blob/main/preview.png?raw=true" width="100%" height="auto" />

## Installing

```shell
npm install 3thix-login-widget
# OR
yarn add 3thix-login-widget
```

## Usage

```tsx
import LoginWidget from '3thix-login-widget';

const YourComponent = () => {
  function handleCallback(token: string) {
    // ...
  }

  return (
    <LoginWidget target='SANDBOX' callback={handleCallback} /> // target: PRODUCTION | SANDBOX
  )
}

export default YourComponent;
```

### Styling

```tsx
// ...
  return (
    <LoginWidget
      callback={handleCallback}
      onlySignUp={false} // show login scren first
      url={url}
      style={{
        BackgroundColor: '#d6d6f1',
        CardBackground: '#fff',
        TextColor: '#68679D',
        LinkColor: '#b8b8d7',
        ButtonBackground: '#24D07E',
        ButtonTextColor: '#FFFFFF',
        InputLabelColor: '#68679D',
        InputTextColor: '#68679D',
        InputBackground: '#efeff3',
        InputBorderColor: '#efeff3',
      }}
    />
  )
//...
```


## Requests

If you want to create your own login frontend implementation, these endpoints could be util for you:

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

### Get authorization pin to login by email

To perform login will need to get an authorization pin and to receive this pin in your email, you must request:
```
[POST] /entity/user/auth
{
  email:string,
  password:string,
}
```

### Login

To perform a login you first of all will call the ``/entity/user/auth`` endpoint, and after that send the pin, email and password to this endpoint:
```
[POST] /entity/user/auth/pin
{
  pin:string,
  email:string,
}
```

### Google SSO login

Because SSO already certify users authenticity, you only need to redirect the user to the login page sending in the queryParams the endpoint you want to receive the token when users finish his authentication:
```
[GET] /entity/user/auth/google/signin?callbackUrl=<url-to-get-token-back>
```

### Get authorization pin to change password by email

To perform login will need to get an authorization pin and to receive this pin in your email, you must request:
```
[POST] /entity/user/password/update
{
  email:string,
}
```

### Update password

You will use this endpoint to reset users password. You first of all will call the ``/entity/user/password/update`` endpoint, and after that send the pin, email and the new password to this endpoint:
```
[POST] /entity/user/password/update/pin
{
  pin:string,
  email:string,
  new_password:string,
}
```
