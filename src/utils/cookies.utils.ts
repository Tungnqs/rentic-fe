export function setCookie(name: string, value: string, days: number = 7) {
  const expires = new Date();
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}= ${value}; expires=${expires.toUTCString()}`;
  console.log(expires);
}

export function getCookie(name: string) {
  const cookieValue = document.cookie.match(
    "(^|;)\\s*" + name + "\\s*=\\s*([^;]+)"
  );
  return cookieValue ? decodeURIComponent(cookieValue.pop()!) : "";
}

export function deleteCookie(name: string) {
  const expires = new Date(0);
  document.cookie = `${name}=; expires=${expires.toUTCString()}`;
}
