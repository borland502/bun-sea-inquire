import { logger } from "@/lib/logger";
import { EMBEDDED_CONFIG } from "@/lib/embedded-config";
import type { CommandConfig, Config, CommandOptionConfig } from "@/types/config";

function cloneCommand(command: CommandConfig): CommandConfig {
  const cloned: CommandConfig = {
    name: command.name,
    description: command.description,
  };

  if (typeof command.subcommands === "boolean") {
    cloned.subcommands = command.subcommands;
  }

  if (command.children) {
    cloned.children = command.children.map((child) => cloneCommand(child));
  }

  if (command.options) {
    cloned.options = command.options.map((option: CommandOptionConfig) => ({
      flags: option.flags,
      description: option.description,
      defaultValue: option.defaultValue,
    }));
  }

  return cloned;
}

function cloneConfig(config: Config): Config {
  return {
    app: { ...config.app },
    commands: config.commands.map((command) => cloneCommand(command)),
  };
}

export function loadConfig(): Config {
  logger.debug("Using embedded configuration");
  return cloneConfig(EMBEDDED_CONFIG);
}

// Export a singleton instance
export const appConfig = loadConfig();
