/**
 * Main entry point for the Ludo Player VS Code extension
 */

import * as vscode from 'vscode';
import { ExtensionManager } from './extensionManager';

let extensionManager: ExtensionManager;

/**
 * This method is called when your extension is activated
 * Your extension is activated the very first time the command is executed
 */
export async function activate(context: vscode.ExtensionContext): Promise<void> {
	extensionManager = new ExtensionManager(context);
	await extensionManager.activate();
}

/**
 * This method is called when your extension is deactivated
 */
export function deactivate(): void {
	if (extensionManager) {
		extensionManager.deactivate();
	}
}
