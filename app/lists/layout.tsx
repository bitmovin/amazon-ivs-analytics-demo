import { Container } from '@/components/Container';

export const metadata = {
	title: {
		default: 'Dashboard',
		template: '%s | Dashboard',
	},
	applicationName: 'Bitmovin IVS',
	description: 'Bitmovin and Amazon IVS Demo',
};

const identity = {
	href: '/',
	title: 'Bitmovin',
	logo: {
		src: 'favicon.ico',
		alt: 'icon'
	}
};

const i18nStrings = {
	overflowMenuTitleText: 'Menu',
	overflowMenuTriggerText: 'Menu'
};

const items = [{
	type: 'link-group',
	text: 'Lists',
	href: '/lists',
	items: [{
		type: 'link',
		text: 'Channels',
		href: '/lists/channels',
	},
	{
		type: 'link',
		text: 'Sessions',
		href: '/lists/sessions',
	}]
}] as const;

export default function Layout<T extends JSX.Element>(props: { children: T }) {
	return (
		<Container>{props.children}</Container>
	);
}
