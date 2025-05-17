#!/usr/bin/env bun

import "@/globals";

import { downloadAndInstallTask } from "@/bin/download";
import inquirer from "inquirer";
import { hello } from "@/index";
import { has } from "./lib";
import { appConfig } from "./lib/config";

async function main() {
  // Display app information
  logger.info(`${appConfig.app.name} - ${appConfig.app.version}`);
  logger.info(appConfig.app.description);

  // Prepare command choices for the main menu
  const mainChoices = appConfig.commands.map((cmd) => ({
    name: `${cmd.name} - ${cmd.description}`,
    value: cmd.name,
  }));

  // Add exit option
  mainChoices.push({
    name: "Exit",
    value: "exit",
  });

  // Show main menu
  const { command } = await inquirer.prompt([
    {
      type: "list",
      name: "command",
      message: "Select a command to execute:",
      choices: mainChoices,
    },
  ]);

  if (command === "exit") {
    logger.info("Goodbye!");
    return;
  }

  // Find the selected command
  const selectedCmd = appConfig.commands.find((cmd) => cmd.name === command);

  if (!selectedCmd) {
    logger.error(`Command '${command}' not found.`);
    return main();
  }

  // Handle commands with subcommands
  if (selectedCmd.subcommands && selectedCmd.children && selectedCmd.children.length > 0) {
    const subChoices = selectedCmd.children.map((subCmd) => ({
      name: `${subCmd.name} - ${subCmd.description}`,
      value: subCmd.name,
    }));

    // Add back option
    subChoices.push({
      name: "Back to main menu",
      value: "back",
    });

    const { subcommand } = await inquirer.prompt([
      {
        type: "list",
        name: "subcommand",
        message: `Select a ${selectedCmd.name} command:`,
        choices: subChoices,
      },
    ]);

    if (subcommand === "back") {
      return main();
    }

    const selectedSubCmd = selectedCmd.children.find((subCmd) => subCmd.name === subcommand);

    if (!selectedSubCmd) {
      logger.error(`Subcommand '${subcommand}' not found.`);
      return main();
    }

    // Execute the specific subcommand
    if (selectedCmd.name === "install" && subcommand === "task") {
      try {
        if (await has("task")) {
          logger.info("Task is already installed");
        } else {
          await downloadAndInstallTask();
          logger.info("Task installation complete");
        }
      } catch (error) {
        if (error instanceof Error) {
          logger.error(`Error: ${error.message}`);
        } else {
          logger.error(`Error: ${String(error)}`);
        }
        process.exit(1);
      }
    }
  } else {
    // Handle simple commands
    if (command === "hello") {
      await hello();
    }
  }

  // After command execution, return to main menu
  logger.info("\nCommand execution completed.\n");
  setTimeout(() => main(), 1000); // Brief pause before showing the menu again
}

// Start the application
main().catch((error) => {
  logger.error(`An unexpected error occurred: ${error instanceof Error ? error.message : String(error)}`);
  process.exit(1);
});
