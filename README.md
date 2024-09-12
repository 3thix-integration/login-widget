# Installing

To install you must include in your ``package.json`` file on the dependencies section:
```json
{
  // ...
  "dependencies": {
    // ...
    "login-3thix": "git+ssh://git@github.com:3thix/login-widget.git#v1.0.6"
  }
  // ...
}
```

and run ``yarn`` or ``npm install``.

# Usage

```tsx
import LoginWidget from 'login-3thix/dist';

const url = "https://integration-api.3thix.com"

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

