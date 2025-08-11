# Copilot Instructions

<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

This is a VS Code extension project. Please use the get_vscode_api with a query as input to fetch the latest VS Code API references.

## Project Context
This VS Code extension allows users to play Ludo game seamlessly inside VS Code through:
- Command palette integration ("play lodo")
- Webview panel for game display
- Custom styling to hide browser UI elements for native feel
- Integration with ludoking.com/play

## Key APIs Used
- vscode.window.createWebviewPanel - For creating game panel
- vscode.commands.registerCommand - For command palette integration
- CSP (Content Security Policy) - For iframe security
- asExternalUri - For external URL handling
