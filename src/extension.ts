// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

class LudoGameViewProvider implements vscode.WebviewViewProvider {
	public static readonly viewType = 'ludo-player.gameView';

	private _view?: vscode.WebviewView;
	private _isGameLoaded = false;

	constructor(private readonly _extensionUri: vscode.Uri) { }

	public resolveWebviewView(
		webviewView: vscode.WebviewView,
		context: vscode.WebviewViewResolveContext,
		_token: vscode.CancellationToken,
	) {
		this._view = webviewView;

		webviewView.webview.options = {
			// Allow scripts in the webview
			enableScripts: true,
			localResourceRoots: [
				this._extensionUri
			]
		};

		// Start with the welcome screen instead of loading the game immediately
		webviewView.webview.html = this._getWelcomeHtml();

		// Set initial title and description
		webviewView.title = "";
		webviewView.description = "";

		// Handle messages from the webview
		webviewView.webview.onDidReceiveMessage(
			message => {
				switch (message.command) {
					case 'startGame':
						this._loadGame();
						break;
					case 'stopGame':
						this._stopGame();
						break;
					case 'refreshGame':
						this._refreshGame();
						break;
				}
			}
		);
	}

	private _loadGame() {
		if (this._view) {
			this._isGameLoaded = true;
			this._view.webview.html = this._getGameHtml();
		}
	}

	private _stopGame() {
		if (this._view) {
			this._isGameLoaded = false;
			this._view.webview.html = this._getWelcomeHtml();
		}
	}

	private _refreshGame() {
		if (this._view && this._isGameLoaded) {
			this._view.webview.html = this._getGameHtml();
		}
	}

	private _getWelcomeHtml(): string {
		return `<!DOCTYPE html>
			<html lang="en">
			<head>
				<meta charset="UTF-8">
				<meta name="viewport" content="width=device-width, initial-scale=1.0">
				<meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src 'unsafe-inline'; script-src 'unsafe-inline';">
				<title>Ludo Game</title>
				<style>
					body {
						margin: 0;
						padding: 16px;
						background: var(--vscode-editor-background, #1e1e1e);
						color: var(--vscode-editor-foreground, #fff);
						font-family: var(--vscode-font-family, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif);
						height: 100vh;
						display: flex;
						flex-direction: column;
						box-sizing: border-box;
					}
					
					.welcome-container {
						display: flex;
						flex-direction: column;
						align-items: center;
						justify-content: center;
						flex: 1;
						text-align: center;
					}
					
					.game-icon {
						font-size: 48px;
						margin-bottom: 16px;
						animation: bounce 2s infinite;
					}
					
					@keyframes bounce {
						0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
						40% { transform: translateY(-10px); }
						60% { transform: translateY(-5px); }
					}
					
					.welcome-title {
						font-size: 18px;
						font-weight: 600;
						margin-bottom: 8px;
						color: var(--vscode-editor-foreground);
					}
					
					.welcome-description {
						font-size: 14px;
						opacity: 0.8;
						margin-bottom: 24px;
						color: var(--vscode-descriptionForeground);
						line-height: 1.4;
					}
					
					.button {
						background: var(--vscode-button-background, #0e639c);
						color: var(--vscode-button-foreground, #ffffff);
						border: none;
						padding: 12px 24px;
						border-radius: 6px;
						font-size: 14px;
						font-weight: 500;
						cursor: pointer;
						transition: background-color 0.2s;
						margin: 4px;
						min-width: 120px;
					}
					
					.button:hover {
						background: var(--vscode-button-hoverBackground, #1177bb);
					}
					
					.button:active {
						transform: translateY(1px);
					}
					
					.status-info {
						margin-top: 24px;
						padding: 12px;
						background: var(--vscode-notifications-background, #2d2d2d);
						border: 1px solid var(--vscode-notifications-border, #454545);
						border-radius: 6px;
						font-size: 12px;
						opacity: 0.8;
					}
					
					.status-dot {
						display: inline-block;
						width: 8px;
						height: 8px;
						background: #4ade80;
						border-radius: 50%;
						margin-right: 6px;
					}
				</style>
			</head>
			<body>
				<div class="welcome-container">
					<div class="game-icon">🎲</div>
					<h1 class="welcome-title">Ludo Game</h1>
					<p class="welcome-description">
						Ready to play Ludo? Click "Start Game" to load the game.<br>
						You can stop the game anytime to save resources.
					</p>
					
					<button class="button" onclick="startGame()">
						🎮 Start Game
					</button>
					<p style="font-size: 12px; margin: 8px 0; opacity: 0.7;">
						Game will open in this panel
					</p>
					
					<div class="status-info">
						<span class="status-dot"></span>
						Ready to play • Memory optimized
					</div>
				</div>
				
				<script>
					const vscode = acquireVsCodeApi();
					
					function startGame() {
						vscode.postMessage({ command: 'startGame' });
					}
				</script>
			</body>
			</html>`;
	}

	private _getGameHtml(): string {
		return `<!DOCTYPE html>
			<html lang="en">
			<head>
				<meta charset="UTF-8">
				<meta name="viewport" content="width=device-width, initial-scale=1.0">
				<meta http-equiv="Content-Security-Policy" content="default-src 'none'; frame-src https://ludoking.com; style-src 'unsafe-inline'; script-src 'unsafe-inline';">
				<title>Ludo Game</title>
				<style>
					body {
						margin: 0;
						padding: 0;
						background: var(--vscode-editor-background, #1e1e1e);
						overflow: hidden;
						font-family: var(--vscode-font-family, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif);
						height: 100vh;
						display: flex;
						flex-direction: column;
					}
					
					.game-container {
						width: 100%;
						height: 100%;
						position: relative;
						display: flex;
						flex-direction: column;
					}
					
					.game-header {
						background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
						color: white;
						padding: 6px 12px;
						display: flex;
						align-items: center;
						justify-content: space-between;
						box-shadow: 0 2px 4px rgba(0,0,0,0.2);
						z-index: 1000;
						flex-shrink: 0;
					}
					
					.game-title {
						font-weight: 600;
						font-size: 12px;
						display: flex;
						align-items: center;
						gap: 6px;
					}
					
					.game-controls {
						display: flex;
						gap: 6px;
					}
					
					.control-btn {
						background: rgba(255,255,255,0.2);
						border: none;
						color: white;
						padding: 4px 8px;
						border-radius: 4px;
						font-size: 10px;
						cursor: pointer;
						transition: background-color 0.2s;
					}
					
					.control-btn:hover {
						background: rgba(255,255,255,0.3);
					}
					
					.status-indicator {
						width: 6px;
						height: 6px;
						background: #4ade80;
						border-radius: 50%;
						animation: pulse 2s infinite;
					}
					
					@keyframes pulse {
						0%, 100% { opacity: 1; }
						50% { opacity: 0.5; }
					}
					
					.game-frame {
						flex: 1;
						border: none;
						background: white;
						width: 100%;
						height: 100%;
					}
					
					.loading-overlay {
						position: absolute;
						top: 40px;
						left: 0;
						right: 0;
						bottom: 0;
						background: var(--vscode-editor-background, #1e1e1e);
						display: flex;
						flex-direction: column;
						align-items: center;
						justify-content: center;
						color: var(--vscode-editor-foreground, #fff);
						transition: opacity 0.3s ease;
					}
					
					.loading-spinner {
						width: 32px;
						height: 32px;
						border: 2px solid var(--vscode-progressBar-background, #333);
						border-top: 2px solid var(--vscode-progressBar-background, #667eea);
						border-radius: 50%;
						animation: spin 1s linear infinite;
						margin-bottom: 12px;
					}
					
					@keyframes spin {
						0% { transform: rotate(0deg); }
						100% { transform: rotate(360deg); }
					}
					
					.loading-text {
						font-size: 12px;
						opacity: 0.8;
						color: var(--vscode-descriptionForeground);
					}
					
					.hidden {
						opacity: 0;
						pointer-events: none;
					}
					
					.game-container {
						border: 1px solid var(--vscode-panel-border, transparent);
						border-radius: 4px;
						overflow: hidden;
					}
				</style>
			</head>
			<body>
				<div class="game-container">
					<div class="game-header">
						<div class="game-title">
							🎲 Ludo King
							<div class="status-indicator"></div>
						</div>
						<div class="game-controls">
							<button class="control-btn" onclick="refreshGame()" title="Refresh Game">
								🔄
							</button>
							<button class="control-btn" onclick="stopGame()" title="Stop Game">
								⏹️
							</button>
						</div>
					</div>
					
					<div class="loading-overlay" id="loadingOverlay">
						<div class="loading-spinner"></div>
						<div class="loading-text">Loading Ludo Game...</div>
					</div>
					
					<iframe 
						class="game-frame" 
						src="https://ludoking.com/play" 
						id="gameFrame"
						title="Ludo Game"
						allow="fullscreen; clipboard-read; clipboard-write"
						sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox">
					</iframe>
				</div>
				
				<script>
					const vscode = acquireVsCodeApi();
					
					// Hide loading overlay when iframe loads
					const iframe = document.getElementById('gameFrame');
					const loadingOverlay = document.getElementById('loadingOverlay');
					
					iframe.addEventListener('load', function() {
						setTimeout(() => {
							loadingOverlay.classList.add('hidden');
						}, 500);
					});
					
					// Handle iframe load errors
					iframe.addEventListener('error', function() {
						loadingOverlay.innerHTML = 
							'<div style="text-align: center;">' +
							'<h3 style="margin: 0; font-size: 16px;">🎲</h3>' +
							'<p style="margin: 8px 0; font-size: 12px;">Unable to load the game</p>' +
							'<p style="font-size: 10px; opacity: 0.7; margin: 0;">Check your internet connection</p>' +
							'<button class="control-btn" onclick="refreshGame()" style="margin-top: 8px;">Try Again</button>' +
							'</div>';
					});
					
					function stopGame() {
						vscode.postMessage({ command: 'stopGame' });
					}
					
					function refreshGame() {
						vscode.postMessage({ command: 'refreshGame' });
					}
				</script>
			</body>
			</html>`;
	}

	public refreshGame() {
		if (this._view) {
			if (this._isGameLoaded) {
				this._view.webview.html = this._getGameHtml();
			} else {
				this._view.webview.html = this._getWelcomeHtml();
			}
		}
	}

	public stopGame() {
		this._stopGame();
	}
}

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('🎲 Ludo Player extension is now active!');

	// Create the webview view provider
	const provider = new LudoGameViewProvider(context.extensionUri);

	// Register the webview view provider
	context.subscriptions.push(
		vscode.window.registerWebviewViewProvider(LudoGameViewProvider.viewType, provider, {
			webviewOptions: {
				retainContextWhenHidden: true
			}
		})
	);

	// Register the play ludo command (for backward compatibility and quick access)
	const playLudoCommand = vscode.commands.registerCommand('ludo-player.playLudo', () => {
		// Focus on the Ludo Player activity bar
		vscode.commands.executeCommand('workbench.view.extension.ludo-player');
		
		// Show a quick notification
		vscode.window.showInformationMessage('🎲 Ludo Game opened in sidebar!');
		
		// Refresh the game
		provider.refreshGame();
	});

	context.subscriptions.push(playLudoCommand);

	// If this is the first time, show a welcome message
	const hasShownWelcome = context.globalState.get('hasShownWelcome', false);
	if (!hasShownWelcome) {
		vscode.window.showInformationMessage(
			'🎲 Ludo Player is ready! Check the sidebar or use "Play Ludo" command.',
			'Open Sidebar',
			'Play Now'
		).then(selection => {
			if (selection === 'Play Now' || selection === 'Open Sidebar') {
				vscode.commands.executeCommand('ludo-player.playLudo');
			}
		});
		context.globalState.update('hasShownWelcome', true);
	}
}

// This method is called when your extension is deactivated
export function deactivate() {
	// Clean up any resources if needed
	console.log('🎲 Ludo Player extension deactivated');
}
