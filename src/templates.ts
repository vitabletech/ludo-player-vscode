/**
 * HTML templates for the Ludo Player extension webviews
 */

import { BRAND_INFO, EXTENSION_CONFIG } from './constants';

export class HtmlTemplates {
	
	static getWelcomeHtml(): string {
		return `<!DOCTYPE html>
			<html lang="en">
			<head>
				<meta charset="UTF-8">
				<meta name="viewport" content="width=device-width, initial-scale=1.0">
				<meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src 'unsafe-inline'; script-src 'unsafe-inline';">
				<title>Ludo Game</title>
				<style>
					${this.getWelcomeStyles()}
				</style>
			</head>
			<body>
				${this.getWelcomeBody()}
				<script>
					${this.getWelcomeScript()}
				</script>
			</body>
			</html>`;
	}

	static getGameHtml(): string {
		return `<!DOCTYPE html>
			<html lang="en">
			<head>
				<meta charset="UTF-8">
				<meta name="viewport" content="width=device-width, initial-scale=1.0">
				<meta http-equiv="Content-Security-Policy" content="default-src 'none'; frame-src ${EXTENSION_CONFIG.gameUrl.split('/')[0]}//${EXTENSION_CONFIG.gameUrl.split('/')[2]}; style-src 'unsafe-inline'; script-src 'unsafe-inline';">
				<title>Ludo Game</title>
				<style>
					${this.getGameStyles()}
				</style>
			</head>
			<body>
				${this.getGameBody()}
				<script>
					${this.getGameScript()}
				</script>
			</body>
			</html>`;
	}

	private static getWelcomeStyles(): string {
		return `
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
			
			.brand-info {
				margin-top: 16px;
				padding: 12px;
				background: var(--vscode-editor-inactiveSelectionBackground, #2a2a2a);
				border: 1px solid var(--vscode-widget-border, #454545);
				border-radius: 6px;
				font-size: 11px;
				opacity: 0.9;
			}
			
			.brand-section {
				text-align: center;
			}
			
			.brand-text {
				margin: 4px 0;
				color: var(--vscode-descriptionForeground);
				line-height: 1.3;
			}
			
			.brand-link {
				color: var(--vscode-textLink-foreground, #3794ff);
				text-decoration: none;
				border-bottom: 1px dotted var(--vscode-textLink-foreground, #3794ff);
				transition: all 0.2s ease;
			}
			
			.brand-link:hover {
				color: var(--vscode-textLink-activeForeground, #4daafc);
				border-bottom-style: solid;
				text-decoration: none;
			}
		`;
	}

	private static getWelcomeBody(): string {
		return `
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
				
				<div class="brand-info">
					<div class="brand-section">
						<p class="brand-text">
							🏢 <a href="${BRAND_INFO.organizationUrl}" target="_blank" class="brand-link">${BRAND_INFO.organizationName}</a>
						</p>
						<p class="brand-text">
							👨‍💻 Developer: <a href="${BRAND_INFO.developerUrl}" target="_blank" class="brand-link">${BRAND_INFO.developerName}</a>
						</p>
						<p class="brand-text">
							🔧 Try our other productivity extension: <a href="${BRAND_INFO.promotionUrl}" target="_blank" class="brand-link">${BRAND_INFO.promotionText}</a>
						</p>
					</div>
				</div>
			</div>
		`;
	}

	private static getWelcomeScript(): string {
		return `
			const vscode = acquireVsCodeApi();
			
			function startGame() {
				vscode.postMessage({ command: 'startGame' });
			}
		`;
	}

	private static getGameStyles(): string {
		return `
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
				border: 1px solid var(--vscode-panel-border, transparent);
				border-radius: 4px;
				overflow: hidden;
			}
			
			.game-header {
				background: var(--vscode-titleBar-activeBackground, linear-gradient(135deg, #667eea 0%, #764ba2 100%));
				color: var(--vscode-titleBar-activeForeground, white);
				padding: 8px 12px;
				display: flex;
				align-items: center;
				justify-content: space-between;
				box-shadow: 0 2px 8px rgba(0,0,0,0.15);
				border-bottom: 1px solid var(--vscode-titleBar-border, rgba(255,255,255,0.1));
				z-index: 1000;
				flex-shrink: 0;
			}
			
			.game-title {
				font-weight: 600;
				font-size: 13px;
				display: flex;
				align-items: center;
				gap: 8px;
				color: inherit;
			}
			
			.game-controls {
				display: flex;
				gap: 8px;
				align-items: center;
			}
			
			.control-btn {
				background: var(--vscode-button-secondaryBackground, rgba(255,255,255,0.1));
				border: 1px solid var(--vscode-button-border, rgba(255,255,255,0.2));
				color: var(--vscode-button-secondaryForeground, white);
				padding: 6px 10px;
				border-radius: 6px;
				font-size: 11px;
				font-weight: 500;
				cursor: pointer;
				transition: all 0.2s ease;
				display: flex;
				align-items: center;
				justify-content: center;
				min-width: 28px;
				min-height: 24px;
				box-shadow: 0 1px 3px rgba(0,0,0,0.1);
			}
			
			.control-btn:hover {
				background: var(--vscode-button-secondaryHoverBackground, rgba(255,255,255,0.2));
				border-color: var(--vscode-button-hoverBackground, rgba(255,255,255,0.3));
				transform: translateY(-1px);
				box-shadow: 0 2px 6px rgba(0,0,0,0.15);
			}
			
			.control-btn:active {
				transform: translateY(0);
				box-shadow: 0 1px 2px rgba(0,0,0,0.1);
			}
			
			.control-btn:focus {
				outline: 2px solid var(--vscode-focusBorder, #007acc);
				outline-offset: 2px;
			}
			
			/* High contrast theme support */
			@media (prefers-contrast: high) {
				.control-btn {
					border: 2px solid var(--vscode-contrastBorder, white);
					background: var(--vscode-button-background, #0e639c);
				}
				
				.control-btn:hover {
					background: var(--vscode-button-hoverBackground, #1177bb);
				}
			}
			
			/* Reduced motion support */
			@media (prefers-reduced-motion: reduce) {
				.control-btn {
					transition: none;
				}
				
				.control-btn:hover {
					transform: none;
				}
				
				.status-indicator {
					animation: none;
				}
			}
			
			.status-indicator {
				width: 8px;
				height: 8px;
				background: var(--vscode-charts-green, #4ade80);
				border: 1px solid var(--vscode-titleBar-activeForeground, white);
				border-radius: 50%;
				animation: pulse 2s infinite;
				box-shadow: 0 0 4px rgba(74, 222, 128, 0.3);
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
		`;
	}

	private static getGameBody(): string {
		return `
			<div class="game-container">
				<div class="game-header">
					<div class="game-title">
						🎲 Ludo King
						<div class="status-indicator"></div>
					</div>
					<div class="game-controls">
						<button class="control-btn" onclick="refreshGame()" title="Refresh Game (Reload if not working)" aria-label="Refresh Game">
							<span role="img" aria-hidden="true">🔄</span>
						</button>
						<button class="control-btn" onclick="stopGame()" title="Stop Game (Return to welcome screen)" aria-label="Stop Game">
							<span role="img" aria-hidden="true">⏹️</span>
						</button>
					</div>
				</div>
				
				<div class="loading-overlay" id="loadingOverlay">
					<div class="loading-spinner"></div>
					<div class="loading-text">Loading Ludo Game...</div>
				</div>
				
				<iframe 
					class="game-frame" 
					src="${EXTENSION_CONFIG.gameUrl}" 
					id="gameFrame"
					title="Ludo Game"
					allow="fullscreen; clipboard-read; clipboard-write"
					sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox">
				</iframe>
			</div>
		`;
	}

	private static getGameScript(): string {
		return `
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
		`;
	}
}
