import packageJson from '../package.json';

export type ConfigValue = {
  baseURL: string;
};


export const CONFIG: ConfigValue = {
  baseURL: import.meta.env.VITE_API_URL ?? ''

};
