export default function getBaseUrl() {
  return getQueryStringParameterByName('useMockApi') ? 'http://www.localhost:3001/' : '/';
}

function getQueryStringParameterByName(name) {
  const urlParams = new URLSearchParams(window.location.search);
  const myParam = urlParams.get(name);

  return myParam !== null;
}
