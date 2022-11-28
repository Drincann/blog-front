import { cacheFactory } from "./runtimeCache";

const API_PREFIX = '/api/v1/';
const conditionalReqCache = cacheFactory.create('etag');

export const api = {
  call: async (apiName: string, body: any) => {
    const res = await fetch(API_PREFIX + apiName, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // browser will not use conditional req with POST
        'If-None-Match': conditionalReqCache[apiName]?.etag,
      },
      body: JSON.stringify(body),
    })
    if (res.status === 304) return conditionalReqCache[apiName].body;
    conditionalReqCache[apiName] = { etag: res.headers?.get('ETag'), body: await res.json() }
    return conditionalReqCache[apiName].body;
  }
}