# Login 3thix widget

[![NPM Version](https://img.shields.io/npm/v/3thix-login-widget)](https://www.npmjs.com/package/3thix-login-widget)

This library makes it easy to embed a login page into your JavaScript app with minimal effort.

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
