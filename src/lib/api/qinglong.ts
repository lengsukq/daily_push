import axios from "axios";
import type { EnvItem, QLConnection } from "@/types";

async function getToken(config: QLConnection): Promise<string> {
  const { data } = await axios.get(
    `${config.url}/open/auth/token?client_id=${config.clientId}&client_secret=${config.clientSecret}`
  );
  if (data.code !== 200) {
    throw new Error(data.message || "获取 Token 失败");
  }
  return data.data.token;
}

async function getAuthHeaders(config: QLConnection) {
  const token = config.token || await getToken(config);
  return { Authorization: `Bearer ${token}` };
}

export const qlApiClient = {
  async getEnvs(config: QLConnection) {
    const headers = await getAuthHeaders(config);
    const { data } = await axios.get(`${config.url}/open/envs`, { headers });
    return data;
  },

  async getEnvById(config: QLConnection, id: number) {
    const headers = await getAuthHeaders(config);
    const { data } = await axios.get(`${config.url}/open/envs/${id}`, { headers });
    return data;
  },

  async createEnv(config: QLConnection, env: Partial<EnvItem>) {
    const headers = await getAuthHeaders(config);
    const { data } = await axios.post(`${config.url}/open/envs`, [env], { headers });
    return data;
  },

  async updateEnv(config: QLConnection, id: number, env: Partial<EnvItem>) {
    const headers = await getAuthHeaders(config);
    const { data } = await axios.put(`${config.url}/open/envs`, { ...env, id }, { headers });
    return data;
  },

  async deleteEnvs(config: QLConnection, ids: number[]) {
    const headers = await getAuthHeaders(config);
    const { data } = await axios.delete(`${config.url}/open/envs`, {
      headers,
      data: ids,
    });
    return data;
  },

  async enableEnvs(config: QLConnection, ids: number[]) {
    const headers = await getAuthHeaders(config);
    const { data } = await axios.put(`${config.url}/open/envs/enable`, ids, { headers });
    return data;
  },

  async disableEnvs(config: QLConnection, ids: number[]) {
    const headers = await getAuthHeaders(config);
    const { data } = await axios.put(`${config.url}/open/envs/disable`, ids, { headers });
    return data;
  },
};
