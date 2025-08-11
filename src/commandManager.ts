/**
 * Command Manager for the Ludo Player extension
 */

import * as vscode from 'vscode';
import { LudoGameViewProvider } from './webviewProvider';
import { EXTENSION_CONFIG, MESSAGES } from './constants';

export class CommandManager {
	private static instance: CommandManager;

	private constructor() {}

	public static getInstance(): CommandManager {
		if (!CommandManager.instance) {
			CommandManager.instance = new CommandManager();
		}
		return CommandManager.instance;
	}

	public registerCommands(
		context: vscode.ExtensionContext, 
		provider: LudoGameViewProvider
	): void {
		const playLudoCommand = this.createPlayLudoCommand(provider);
		context.subscriptions.push(playLudoCommand);
	}

	private createPlayLudoCommand(provider: LudoGameViewProvider): vscode.Disposable {
		return vscode.commands.registerCommand(EXTENSION_CONFIG.commandId, () => {
			this.executePlayLudoCommand(provider);
		});
	}

	private async executePlayLudoCommand(provider: LudoGameViewProvider): Promise<void> {
		// Focus on the Ludo Player activity bar
		await vscode.commands.executeCommand('workbench.view.extension.ludo-player');
		
		// Show a quick notification
		vscode.window.showInformationMessage(MESSAGES.gameOpened);
		
		// Refresh the game
		provider.refreshGamePublic();
	}

	public async showWelcomeMessage(context: vscode.ExtensionContext): Promise<void> {
		const hasShownWelcome = context.globalState.get('hasShownWelcome', false);
		
		if (!hasShownWelcome) {
			const selection = await vscode.window.showInformationMessage(
				MESSAGES.welcomeMessage,
				MESSAGES.welcomeButtons.openSidebar,
				MESSAGES.welcomeButtons.playNow
			);

			if (selection === MESSAGES.welcomeButtons.playNow || 
				selection === MESSAGES.welcomeButtons.openSidebar) {
				await vscode.commands.executeCommand(EXTENSION_CONFIG.commandId);
			}

			context.globalState.update('hasShownWelcome', true);
		}
	}
}
