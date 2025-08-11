/**
 * Constants for the Ludo Player extension
 */

export const EXTENSION_CONFIG = {
	viewType: 'ludo-player.gameView',
	commandId: 'ludo-player.playLudo',
	gameUrl: 'https://ludoking.com/play'
} as const;

export const BRAND_INFO = {
	organizationName: 'msrajawat298.in',
	organizationUrl: 'https://msrajawat298.in/',
	developerName: 'Mayank Singh Kushwah',
	developerUrl: 'https://github.com/msrajawat298',
	promotionText: 'SnippetMaster',
	promotionUrl: 'https://github.com/msrajawat298/SnippetMaster'
} as const;

export const MESSAGES = {
	extensionActive: '🎲 Ludo Player extension is now active!',
	extensionDeactivated: '🎲 Ludo Player extension deactivated',
	gameOpened: '🎲 Ludo Game opened in sidebar!',
	welcomeMessage: '🎲 Ludo Player is ready! Check the sidebar or use "Play Ludo" command.',
	welcomeButtons: {
		openSidebar: 'Open Sidebar',
		playNow: 'Play Now'
	}
} as const;
