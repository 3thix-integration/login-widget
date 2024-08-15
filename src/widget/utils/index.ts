const tokenQueryParam = 'token';

export function getTokenFromURL() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(tokenQueryParam);
}

export function deleteTokenFromURL() {
  const urlParams = new URLSearchParams(window.location.search);
  urlParams.delete(tokenQueryParam);

  window.location.replace(window.location.origin + window.location.pathname + '?' + urlParams.toString());
}
