type BalanceData = {
  username: string,
  balance: string,
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
  networkURL: string,
  privateKey: string,
  publicKey: string,
): Promise<BalanceData | any> {
  console.log(privateKey);
  console.log(publicKey);
  fetch(`${networkURL}/balance`, {
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
    .catch((error) => ({ error }));
}
