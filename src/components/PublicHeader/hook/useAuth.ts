import { useEffect, useState } from 'react';

const apiUrl = '/portalapi/api/1/auth/portal_profile_info?app=portal';

async function fetchPortalAuth() {
  try {
    const response = await fetch(apiUrl);
    const {
      data: { user },
      code,
    } = await response.json();
    if (code !== 0) {
      throw 'code is not 0';
    }
    return user;
  } catch (error) {
    console.error(error);
    return null;
  }
}

const devHost = () =>
  location.host.includes('localhost')
    ? 'http://portalhome.uae.shensz.local'
    : 'https://portal.guorou.net/';

const defaultRedirectTime = 2;
const sto = {
  set: (times = defaultRedirectTime, key = 'redirectTime') =>
    sessionStorage.setItem(key, times.toString()),
  get: (key = 'redirectTime') => Number(sessionStorage.getItem(key)),
};

export function useAuth() {
  const [user, setUser] = useState<null | User>(null);
  useEffect(() => {
    sto.set();
    fetchPortalAuth().then(res => {
      let remainingTime = sto.get();
      if (remainingTime <= 0) return;
      if (!res) {
        const loginUrl = `${devHost()}/login?from=${encodeURIComponent(
          window.location.href,
        )}`;
        // window.location.replace(loginUrl);
        sto.set(remainingTime--);
        console.log(
          '%celelee test:',
          'background:#000;color:#fff',
          remainingTime,
          loginUrl,
        );
        return;
      }
      setUser(res);
    });
  }, []);
  return { user };
}

interface User {
  id: number;
  username: string;
  phone: string;
  role: number;
  access_token: string;
  dingtalk_uid: string;
  avatar_url: string;
  status: number;
  has_change_password: boolean;
  portal_role: number[];
  user_role: Userrole[];
  master_id: number;
  permission: string[];
}

interface Userrole {
  role_id: number;
  role_name: string;
}
