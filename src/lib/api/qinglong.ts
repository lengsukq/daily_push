import axios from "axios";
import type { EnvItem, QLConnection } from "@/types";

export const qlApiClient = {
  async getEnvs(config: QLConnection) {
    const { data } = await axios.get(`${config.url}/open/envs`, {
      headers: { Authorization: `Bearer ${config.token}` },
    });
    return data;
  },

  async getEnvById(config: QLConnection, id: number) {
    const { data } = await axios.get(`${config.url}/open/envs/${id}`, {
      headers: { Authorization: `Bearer ${config.token}` },
    });
    return data;
  },

  async createEnv(config: QLConnection, env: Partial<EnvItem>) {
    const { data } = await axios.post(`${config.url}/open/envs`, [env], {
      headers: { Authorization: `Bearer ${config.token}` },
    });
    return data;
  },

  async updateEnv(config: QLConnection, id: number, env: Partial<EnvItem>) {
    const { data } = await axios.put(`${config.url}/open/envs`, { ...env, id }, {
      headers: { Authorization: `Bearer ${config.token}` },
    });
    return data;
  },

  async deleteEnvs(config: QLConnection, ids: number[]) {
    const { data } = await axios.delete(`${config.url}/open/envs`, {
      headers: { Authorization: `Bearer ${config.token}` },
      data: ids,
    });
    return data;
  },

  async enableEnvs(config: QLConnection, ids: number[]) {
    const { data } = await axios.put(`${config.url}/open/envs/enable`, ids, {
      headers: { Authorization: `Bearer ${config.token}` },
    });
    return data;
  },

  async disableEnvs(config: QLConnection, ids: number[]) {
    const { data } = await axios.put(`${config.url}/open/envs/disable`, ids, {
      headers: { Authorization: `Bearer ${config.token}` },
    });
    return data;
  },
};
