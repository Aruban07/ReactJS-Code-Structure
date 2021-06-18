export const set = (cname, cvalue, exdays, domain = null) => {
  const d = new Date();
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
  const expires = `expires=${d.toUTCString()}`;
  if (domain) {
    document.cookie = `${cname}=${cvalue};${expires};domain=${domain};path=/`;
  } else {
    document.cookie = `${cname}=${cvalue};${expires};path=/`;
  }
};

export const get = (cname) => {
  const name = `${cname}=`;
  const ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i += 1) {
    let c = ca[i];
    while (c.charAt(0) === ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length);
    }
  }
  return null;
};

export const erase = (name) => {
  document.cookie = `${name}=; Max-Age=-99999999;`;
};

export const eraseAllSync = async (domain) => new Promise((resolve, reject) => {
  try {
    const cookies = document.cookie.split(';');
    let flag = false;
    for (let i = 0; i < cookies.length; i += 1) {
      const cookie = cookies[i];
      const eqPos = cookie.indexOf('=');
      const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
      if (domain) {
        document.cookie = `${name}=;domain=${domain};expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;`;
      } else {
        document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;`;
      }
      if (i === (cookies.length - 1)) {
        flag = true;
      }
    }
    const intervalId = setInterval(() => {
      if (flag) {
        clearInterval(intervalId);
        resolve();
      }
    }, 100);
  } catch (error) {
    reject(error);
  }
});
