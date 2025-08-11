/**
 * Extension Manager - Main orchestrator for the Ludo Player extension
 */

import * as vscode from 'vscode';
import { LudoGameViewProvider } from './webviewProvider';
import { CommandManager } from './commandManager';
import { MESSAGES } from './constants';

export class ExtensionManager {
	private readonly provider: LudoGameViewProvider;
	private readonly commandManager: CommandManager;

	constructor(private readonly context: vscode.ExtensionContext) {
		this.provider = new LudoGameViewProvider(context.extensionUri);
		this.commandManager = CommandManager.getInstance();
	}

	public async activate(): Promise<void> {
		console.log(MESSAGES.extensionActive);

		this.registerWebviewProvider();
		this.registerCommands();
		await this.showWelcomeMessageIfNeeded();
	}

	public deactivate(): void {
		console.log(MESSAGES.extensionDeactivated);
		// Clean up any resources if needed
	}

	private registerWebviewProvider(): void {
		const disposable = vscode.window.registerWebviewViewProvider(
			LudoGameViewProvider.viewType, 
			this.provider, 
			{
				webviewOptions: {
					retainContextWhenHidden: true
				}
			}
		);

		this.context.subscriptions.push(disposable);
	}

	private registerCommands(): void {
		this.commandManager.registerCommands(this.context, this.provider);
	}

	private async showWelcomeMessageIfNeeded(): Promise<void> {
		await this.commandManager.showWelcomeMessage(this.context);
	}

	public getProvider(): LudoGameViewProvider {
		return this.provider;
	}
}
