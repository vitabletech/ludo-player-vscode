/**
 * Type definitions for the Ludo Player extension
 */

export interface WebviewMessage {
	command: 'startGame' | 'stopGame' | 'refreshGame';
}

export interface GameState {
	isLoaded: boolean;
	view?: any; // vscode.WebviewView
}

export interface BrandInfo {
	organizationName: string;
	organizationUrl: string;
	developerName: string;
	developerUrl: string;
	promotionText: string;
	promotionUrl: string;
}
