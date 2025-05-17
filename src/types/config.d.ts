declare module "config" {
  export interface IConfig {
    get<T>(setting: string): T;
    has(setting: string): boolean;
  }

  const config: IConfig;
  export default config;
}

export interface AppConfig {
  name: string;
  version: string;
  description: string;
}

export interface CommandConfig {
  name: string;
  description: string;
  subcommands?: boolean;
  children?: CommandConfig[];
  options?: { flags: string; description: string; defaultValue?: any }[];
}

export interface Config {
  app: AppConfig;
  commands: CommandConfig[];
}
