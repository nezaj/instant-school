import { adminConfig } from '@/data/config';

function authorizedHeaders(config) {
  const { adminToken, appId } = config;
  return {
    "content-type": "application/json",
    "authorization": `Bearer ${adminToken}`,
    "app-id": appId
  }
}

export async function fetchSchema(): Promise<any> {
  const res = await fetch(`${adminConfig.apiURI}/admin/schema_experimental`, {
    method: "GET",
    headers: authorizedHeaders(adminConfig),
  });
  return await res.json();
}

export async function httpTransact(txSteps): Promise<any> {
  const res = await fetch(`${adminConfig.apiURI}/admin/transact`, {
    method: "POST",
    headers: authorizedHeaders(adminConfig),
    body: JSON.stringify({ 'steps': txSteps }),
  });
  return await res.json();
}
