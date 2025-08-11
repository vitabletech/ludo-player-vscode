// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

class LudoGamePanel {
	private static _currentPanel: LudoGamePanel | undefined;
	public static readonly viewType = 'ludoGame';

	private readonly _panel: vscode.WebviewPanel;
	private readonly _extensionUri: vscode.Uri;
	private readonly _disposables: vscode.Disposable[] = [];

	public static get currentPanel(): LudoGamePanel | undefined {
		return LudoGamePanel._currentPanel;
	}

	public static createOrShow(extensionUri: vscode.Uri) {
		const column = vscode.window.activeTextEditor
			? vscode.window.activeTextEditor.viewColumn
			: undefined;

		// If we already have a panel, show it
		if (LudoGamePanel._currentPanel) {
			LudoGamePanel._currentPanel._panel.reveal(column);
			return;
		}

		// Otherwise, create a new panel
		const panel = vscode.window.createWebviewPanel(
			LudoGamePanel.viewType,
			'🎲 Ludo Game',
			column || vscode.ViewColumn.One,
			{
				// Enable javascript in the webview
				enableScripts: true,
				// And restrict the webview to only load content from our extension's `media` directory
				localResourceRoots: [vscode.Uri.joinPath(extensionUri, 'media')],
				// Allow the webview to retain context when it becomes hidden
				retainContextWhenHidden: true
			}
		);

		LudoGamePanel._currentPanel = new LudoGamePanel(panel, extensionUri);
	}

	private constructor(panel: vscode.WebviewPanel, extensionUri: vscode.Uri) {
		this._panel = panel;
		this._extensionUri = extensionUri;

		// Set the webview's initial html content
		// Use setTimeout to avoid async operation in constructor
		setTimeout(() => {
			this._update();
		}, 0);

		// Listen for when the panel is disposed
		// This happens when the user closes the panel or when the panel is closed programmatically
		this._panel.onDidDispose(() => this.dispose(), null, this._disposables);

		// Update the content based on view changes
		this._panel.onDidChangeViewState(
			e => {
				if (this._panel.visible) {
					this._update();
				}
			},
			null,
			this._disposables
		);
	}

	public dispose() {
		LudoGamePanel._currentPanel = undefined;

		// Clean up our resources
		this._panel.dispose();

		while (this._disposables.length) {
			const x = this._disposables.pop();
			if (x) {
				x.dispose();
			}
		}
	}

	private async _update() {
		const webview = this._panel.webview;
		this._panel.title = '🎲 Ludo Game';
		this._panel.webview.html = await this._getHtmlForWebview(webview);
	}

	private async _getHtmlForWebview(webview: vscode.Webview): Promise<string> {
		// Get the external URI for the ludo game
		const gameUri = await vscode.env.asExternalUri(vscode.Uri.parse('https://ludoking.com/play'));
		
		return `<!DOCTYPE html>
			<html lang="en">
			<head>
				<meta charset="UTF-8">
				<meta name="viewport" content="width=device-width, initial-scale=1.0">
				<meta http-equiv="Content-Security-Policy" content="default-src 'none'; frame-src ${gameUri} https://ludoking.com; style-src 'unsafe-inline'; script-src 'unsafe-inline';">
				<title>Ludo Game</title>
				<style>
					body {
						margin: 0;
						padding: 0;
						background: #1e1e1e;
						overflow: hidden;
						font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
					}
					
					.game-container {
						width: 100vw;
						height: 100vh;
						position: relative;
						display: flex;
						flex-direction: column;
					}
					
					.game-header {
						background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
						color: white;
						padding: 8px 16px;
						display: flex;
						align-items: center;
						justify-content: space-between;
						box-shadow: 0 2px 8px rgba(0,0,0,0.2);
						z-index: 1000;
					}
					
					.game-title {
						font-weight: 600;
						font-size: 16px;
						display: flex;
						align-items: center;
						gap: 8px;
					}
					
					.status-indicator {
						width: 8px;
						height: 8px;
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
						border-radius: 0 0 8px 8px;
					}
					
					.loading-overlay {
						position: absolute;
						top: 40px;
						left: 0;
						right: 0;
						bottom: 0;
						background: #1e1e1e;
						display: flex;
						flex-direction: column;
						align-items: center;
						justify-content: center;
						color: #fff;
						transition: opacity 0.3s ease;
					}
					
					.loading-spinner {
						width: 40px;
						height: 40px;
						border: 3px solid #333;
						border-top: 3px solid #667eea;
						border-radius: 50%;
						animation: spin 1s linear infinite;
						margin-bottom: 16px;
					}
					
					@keyframes spin {
						0% { transform: rotate(0deg); }
						100% { transform: rotate(360deg); }
					}
					
					.loading-text {
						font-size: 14px;
						opacity: 0.8;
					}
					
					.hidden {
						opacity: 0;
						pointer-events: none;
					}
					
					/* Hide scrollbars for a cleaner look */
					.game-frame {
						scrollbar-width: none;
						-ms-overflow-style: none;
					}
					
					.game-frame::-webkit-scrollbar {
						display: none;
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
						<div style="font-size: 12px; opacity: 0.8;">
							Playing in VS Code
						</div>
					</div>
					
					<div class="loading-overlay" id="loadingOverlay">
						<div class="loading-spinner"></div>
						<div class="loading-text">Loading Ludo Game...</div>
					</div>
					
					<iframe 
						class="game-frame" 
						src="${gameUri}" 
						id="gameFrame"
						title="Ludo Game"
						allow="fullscreen; clipboard-read; clipboard-write"
						sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox">
					</iframe>
				</div>
				
				<script>
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
							'<h3>🎲</h3>' +
							'<p>Unable to load the game</p>' +
							'<p style="font-size: 12px; opacity: 0.7;">Please check your internet connection</p>' +
							'</div>';
					});
					
					// Add some keyboard shortcuts for better UX
					document.addEventListener('keydown', function(e) {
						// F11 for fullscreen-like experience
						if (e.key === 'F11') {
							e.preventDefault();
							// VS Code will handle the actual fullscreen
						}
						
						// Escape to focus back to editor
						if (e.key === 'Escape') {
							// This will help users get back to coding quickly
							console.log('Escape pressed - returning focus to editor');
						}
					});
					
					// Enhance the gaming experience
					window.addEventListener('message', function(event) {
						// Handle any messages from the game iframe if needed
						if (event.origin === 'https://ludoking.com') {
							console.log('Game message received:', event.data);
						}
					});
				</script>
			</body>
			</html>`;
	}
}

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('🎲 Ludo Player extension is now active!');

	// Register the play ludo command
	const playLudoCommand = vscode.commands.registerCommand('ludo-player.playLudo', () => {
		// Show a quick notification
		vscode.window.showInformationMessage('🎲 Loading Ludo Game...');
		
		// Create or show the ludo game panel
		LudoGamePanel.createOrShow(context.extensionUri);
	});

	context.subscriptions.push(playLudoCommand);

	// If this is the first time, show a welcome message
	const hasShownWelcome = context.globalState.get('hasShownWelcome', false);
	if (!hasShownWelcome) {
		vscode.window.showInformationMessage(
			'🎲 Ludo Player is ready! Use "Play Ludo" command to start playing.',
			'Play Now'
		).then(selection => {
			if (selection === 'Play Now') {
				vscode.commands.executeCommand('ludo-player.playLudo');
			}
		});
		context.globalState.update('hasShownWelcome', true);
	}
}

// This method is called when your extension is deactivated
export function deactivate() {
	// Clean up any resources if needed
	if (LudoGamePanel.currentPanel) {
		LudoGamePanel.currentPanel.dispose();
	}
}
