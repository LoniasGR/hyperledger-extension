import {
  balanceURL, vruURL, partsURL, initURL, sla2BalanceURL,
} from '../utils/constants';
import { keyToString } from '../utils/utils';

type BalanceData = {
  username?: string,
  balance?: string,
  error?: string,
};

type VRUAssets = {
  highRisk: number,
  lowRisk: number,
  noRisk: number,
  critical: number,
  warning: number,
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

type InitData = {
  organisation?: number,
  username?: string,
  error?: string,
};

type RequestData = {
  key: string,
  cert: string,
  startDate?: string | number,
  endDate?: string | number,
};

async function apiService(URL: string, data: RequestData): Promise<any> {
  return fetch(URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json());
}

export async function getBalance(
  privateKey: string,
  publicKey: string,
  organisation: number,
): Promise<BalanceData> {
  const url = organisation === 1 ? balanceURL : sla2BalanceURL;
  return apiService(
    url,
    {
      key: keyToString(privateKey),
      cert: keyToString(publicKey),
    },
  )
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
  return apiService(
    vruURL,
    {
      key: keyToString(privateKey),
      cert: keyToString(publicKey),
      startDate,
      endDate,
    },
  )
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
  return apiService(
    partsURL,
    {
      key: keyToString(privateKey),
      cert: keyToString(publicKey),
      startDate: new Date(startDate).toISOString(),
      endDate: new Date(endDate).toISOString(),
    },
  )
    .then((data) => {
      if (data.success === false) {
        return { error: data.error };
      }
      // console.log(data.assets);
      return { assets: data.assets };
    })
    .catch((error: Error) => {
      const errStr = error.toString();
      return { error: errStr };
    });
}

export async function getInitInfo(
  privateKey: string,
  publicKey: string,
): Promise<InitData> {
  return apiService(
    initURL,
    {
      key: keyToString(privateKey),
      cert: keyToString(publicKey),
    },
  ).then((data) => {
    if (data.success === false) {
      return { error: data.error };
    }
    return { organisation: data.organisation, username: data.username };
  })
    .catch((error: Error) => {
      const errStr = error.toString();
      return { error: errStr };
    });
}
