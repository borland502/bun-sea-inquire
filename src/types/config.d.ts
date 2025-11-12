export interface AppConfig {
  name: string;
  version: string;
  description: string;
}

export interface CommandOptionConfig {
  flags: string;
  description: string;
  defaultValue?: unknown;
}

export interface CommandConfig {
  name: string;
  description: string;
  subcommands?: boolean;
  children?: CommandConfig[];
  options?: CommandOptionConfig[];
}

export interface Config {
  app: AppConfig;
  commands: CommandConfig[];
}
