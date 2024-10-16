# Login 3thix widget

https://www.npmjs.com/package/3thix-login-widget

## Installing

```shell
npm install 3thix-login-widget
# OR
yarn add 3thix-login-widget
```

## Usage

```tsx
import LoginWidget from '3thix-login-widget';

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

### Styling

```tsx
// ...
  return (
    <LoginWidget
      callback={handleCallback}
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
