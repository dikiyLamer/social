import UniversalCookie from 'universal-cookie';

class Cookie extends UniversalCookie {
  setData(key: string, data: any, ttl: Date) {
    this.set(key, data, { expires: ttl });
  }

  getData(key: string) {
    return this.get(key);
  }

  removeData(key: string) {
    this.remove(key);
  }
}

export const clientCookies = new Cookie();
