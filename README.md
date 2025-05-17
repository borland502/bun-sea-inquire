# bun-sea-inquire

A CLI template for bootstrapping Bun applications with an interactive command menu interface.

## Features

- Interactive command menu using Inquirer.js
- Support for commands and nested subcommands
- Built as a Single Executable Application (SEA) with Bun
- DevContainer configuration for consistent development environments
- Task automation with Taskfile.dev

## Installation

### Prerequisites

- [Bun](https://bun.sh/) runtime installed
- Optional: [Task](https://taskfile.dev/) for build automation

### Quick Install

```bash
# Clone the repository
git clone https://github.com/borland502/bun-sea-inquire.git
cd bun-sea-inquire

# Allow direnv (this will automatically install dependencies)
direnv allow

# If not using direnv, install dependencies manually:
bun install

task build && task run
```

### Development

#### Installing task

`./src/main.ts --> install --> task`

#### Installing direnv

direnv automatically loads and unloads environment variables based on the current directory.

**macOS**:

```bash
brew install direnv

# Ubuntu/Debian
sudo apt-get install direnv

# Fedora
sudo dnf install direnv

# Arch Linux
sudo pacman -S direnv

eval "$(direnv hook bash)"  # or zsh, fish, etc.
```
