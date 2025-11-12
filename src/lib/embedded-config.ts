import type { CommandConfig, Config } from "@/types/config";

const embeddedCommands: CommandConfig[] = [
  {
    name: "hello",
    description: "Hello world command",
  },
  {
    name: "install",
    description: "Install tools",
    subcommands: true,
    children: [
      {
        name: "task",
        description: "Download and install Task",
      },
    ],
  },
];

export const EMBEDDED_CONFIG: Config = {
  app: {
    name: "hello",
    version: "0.2.0",
    description: "A CLI template for bootstrapping Bun applications",
  },
  commands: embeddedCommands,
};
