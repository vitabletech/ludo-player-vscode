# 🎲 Ludo Player for VS Code

A seamless VS Code extension that lets you play Ludo directly inside your editor without any distractions. Perfect for quick gaming breaks during coding sessions!

## Features

- 🎯 **Quick Access**: Search "play ludo" in the command palette and start playing instantly
- 🖥️ **Seamless Experience**: Game runs in a native-feeling webview panel with custom styling
- 🎨 **Clean Interface**: Hidden browser UI elements for a distraction-free gaming experience
- ⚡ **Fast Loading**: Optimized loading with visual feedback
- 🔄 **Persistent State**: Game state is retained when the panel becomes hidden
- ⌨️ **Keyboard Friendly**: Easy navigation and shortcuts

## Usage

1. **Command Palette**: Press `Cmd+Shift+P` (Mac) or `Ctrl+Shift+P` (Windows/Linux)
2. **Search**: Type "Play Ludo" or "play ludo"
3. **Start Playing**: Select the command and enjoy!

### Alternative Methods
- Use the command `Ludo: Play Ludo` from the command palette
- The extension will show a welcome message on first install with a quick-play option

## Technical Features

- **WebView Integration**: Uses VS Code's native webview technology
- **External URI Handling**: Properly handles external game URLs
- **Memory Efficient**: Automatic cleanup and resource management
- **Error Handling**: Graceful handling of network issues
- **CSP Compliant**: Secure Content Security Policy implementation

## Requirements

- VS Code version 1.85.0 or higher
- Internet connection for game loading
- Modern browser engine (built into VS Code)

## Installation

### For Development/Testing:
1. Clone or download this project
2. Open the project folder in VS Code
3. Press `F5` to launch a new Extension Development Host window
4. In the new window, use `Cmd+Shift+P` and search for "Play Ludo"

### For Production (when published):
1. Open VS Code
2. Go to Extensions (`Cmd+Shift+X`)
3. Search for "Ludo Player"
4. Install the extension

## How It Works

This extension creates a seamless gaming experience by:
- Opening the Ludo King game from ludoking.com in a custom webview
- Hiding browser UI elements with custom CSS
- Providing a native-like gaming interface
- Maintaining game state across VS Code sessions

## Development

To contribute or modify this extension:

```bash
# Install dependencies
npm install

# Compile TypeScript
npm run compile

# Watch for changes during development
npm run watch

# Package for production
npm run package
```

## Commands

- `Ludo: Play Ludo` - Opens the Ludo game in a new panel

## Privacy & Security

- The extension only loads content from ludoking.com
- No user data is collected or stored by this extension
- All game data is handled by the ludoking.com website
- Secure Content Security Policy (CSP) implementation

## Troubleshooting

**Game not loading?**
- Check your internet connection
- Ensure ludoking.com is accessible
- Try refreshing the panel

**Panel appears blank?**
- Wait a few seconds for the game to load
- Check VS Code developer tools for any errors
- Restart VS Code if issues persist

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Ludo King game by Gametion Technologies
- VS Code Extension development community

## Extension Settings

Include if your extension adds any VS Code settings through the `contributes.configuration` extension point.

For example:

This extension contributes the following settings:

* `myExtension.enable`: Enable/disable this extension.
* `myExtension.thing`: Set to `blah` to do something.

## Known Issues

Calling out known issues can help limit users opening duplicate issues against your extension.

## Release Notes

Users appreciate release notes as you update your extension.

### 1.0.0

Initial release of ...

### 1.0.1

Fixed issue #.

### 1.1.0

Added features X, Y, and Z.

---

## Following extension guidelines

Ensure that you've read through the extensions guidelines and follow the best practices for creating your extension.

* [Extension Guidelines](https://code.visualstudio.com/api/references/extension-guidelines)

## Working with Markdown

You can author your README using Visual Studio Code. Here are some useful editor keyboard shortcuts:

* Split the editor (`Cmd+\` on macOS or `Ctrl+\` on Windows and Linux).
* Toggle preview (`Shift+Cmd+V` on macOS or `Shift+Ctrl+V` on Windows and Linux).
* Press `Ctrl+Space` (Windows, Linux, macOS) to see a list of Markdown snippets.

## For more information

* [Visual Studio Code's Markdown Support](http://code.visualstudio.com/docs/languages/markdown)
* [Markdown Syntax Reference](https://help.github.com/articles/markdown-basics/)

**Enjoy!**
