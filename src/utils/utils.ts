import { balanceURL, vruURL, partsURL } from './constants';

type BalanceData = {
  username?: string,
  balance?: string,
  error?: string,
};

type VRUAssets = {
  highRisk: number,
  lowRisk: number,
  noRisk: number,
};

type VRUAssetData = {
  assets?: VRUAssets,
  error?: string,
};

type PartsAssets = {
  total: number,
  high_quality: number,
  low_quality: number,
};

type PartsAssetData = {
  assets?: PartsAssets,
  error?: string,
};

export function arrayBufferToString(buffer: ArrayBuffer): string {
  return String.fromCharCode.apply(null, Array.from(new Uint16Array(buffer)));
}

function getStorageData(key: string): Promise<Object | Error> {
  return new Promise(
    (resolve, reject) => {
      chrome.storage.sync.get(key, (result) => (chrome.runtime.lastError
        ? reject(Error(chrome.runtime.lastError.message))
        : resolve(result)));
    },
  );
}

export function setStorageData(data: object) {
  return new Promise<void>(
    (resolve, reject) => {
      chrome.storage.sync.set(data, () => (chrome.runtime.lastError
        ? reject(Error(chrome.runtime.lastError.message))
        : resolve()));
    },
  );
}

export async function getActualStorageData(key: string): Promise<string> {
  const dataObj = await getStorageData(key);
  return Object.values(dataObj)[0];
}

export function keyToString(key: string) {
  return key.replace(/\n/g, '\\n');
}

export async function getBalance(
  privateKey: string,
  publicKey: string,
): Promise<BalanceData> {
  return fetch(balanceURL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      key: keyToString(privateKey),
      cert: keyToString(publicKey),
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success === false) {
        return { error: data.error };
      }
      return {
        username: `Hello, ${data.user.name}`,
        balance: data.user.balance,
      };
    })
    .catch((error: Error) => {
      const errStr = error.toString();
      return { error: errStr };
    });
}

export async function getVRU(
  privateKey: string,
  publicKey: string,
  startDate: number,
  endDate: number,
) : Promise<VRUAssetData> {
  return fetch(vruURL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      key: keyToString(privateKey),
      cert: keyToString(publicKey),
      startDate,
      endDate,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success === false) {
        return { error: data.error };
      }
      return { assets: data.assets };
    })
    .catch((error: Error) => {
      const errStr = error.toString();
      return { error: errStr };
    });
}

export async function getParts(
  privateKey: string,
  publicKey: string,
  startDate: number,
  endDate: number,
) : Promise<PartsAssetData> {
  const start = new Date(startDate);
  const end = new Date(endDate);
  console.log(end.toISOString());
  return fetch(partsURL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      key: keyToString(privateKey),
      cert: keyToString(publicKey),
      startDate: start.toISOString(),
      endDate: end.toISOString(),
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success === false) {
        return { error: data.error };
      }
      console.log(data.assets);
      return { assets: data.assets };
    })
    .catch((error: Error) => {
      const errStr = error.toString();
      return { error: errStr };
    });
}
