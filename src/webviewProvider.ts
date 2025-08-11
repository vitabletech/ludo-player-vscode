/**
 * Webview Provider for the Ludo Game
 */

import * as vscode from 'vscode';
import { HtmlTemplates } from './templates';
import { WebviewMessage } from './types';
import { EXTENSION_CONFIG } from './constants';

export class LudoGameViewProvider implements vscode.WebviewViewProvider {
	public static readonly viewType = EXTENSION_CONFIG.viewType;

	private _view?: vscode.WebviewView;
	private _isGameLoaded = false;

	constructor(private readonly _extensionUri: vscode.Uri) { }

	public resolveWebviewView(
		webviewView: vscode.WebviewView,
		context: vscode.WebviewViewResolveContext,
		_token: vscode.CancellationToken,
	): void {
		this._view = webviewView;

		this.setupWebviewOptions(webviewView);
		this.loadWelcomeScreen();
		this.setupMessageHandler();
		this.setupViewProperties(webviewView);
	}

	private setupWebviewOptions(webviewView: vscode.WebviewView): void {
		webviewView.webview.options = {
			enableScripts: true,
			localResourceRoots: [this._extensionUri]
		};
	}

	private loadWelcomeScreen(): void {
		if (this._view) {
			this._view.webview.html = HtmlTemplates.getWelcomeHtml();
		}
	}

	private setupMessageHandler(): void {
		if (!this._view) {
			return;
		}

		this._view.webview.onDidReceiveMessage((message: WebviewMessage) => {
			switch (message.command) {
				case 'startGame':
					this.loadGame();
					break;
				case 'stopGame':
					this.stopGame();
					break;
				case 'refreshGame':
					this.refreshGame();
					break;
			}
		});
	}

	private setupViewProperties(webviewView: vscode.WebviewView): void {
		webviewView.title = "";
		webviewView.description = "";
	}

	private loadGame(): void {
		if (this._view) {
			this._isGameLoaded = true;
			this._view.webview.html = HtmlTemplates.getGameHtml();
		}
	}

	private stopGame(): void {
		if (this._view) {
			this._isGameLoaded = false;
			this._view.webview.html = HtmlTemplates.getWelcomeHtml();
		}
	}

	private refreshGame(): void {
		if (this._view && this._isGameLoaded) {
			this._view.webview.html = HtmlTemplates.getGameHtml();
		}
	}

	public refreshGamePublic(): void {
		if (this._view) {
			if (this._isGameLoaded) {
				this._view.webview.html = HtmlTemplates.getGameHtml();
			} else {
				this._view.webview.html = HtmlTemplates.getWelcomeHtml();
			}
		}
	}

	public stopGamePublic(): void {
		this.stopGame();
	}

	public get isGameLoaded(): boolean {
		return this._isGameLoaded;
	}
}
