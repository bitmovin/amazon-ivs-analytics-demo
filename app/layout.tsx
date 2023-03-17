import '@cloudscape-design/global-styles/index.css';

import { TopNavigation } from '@/components/TopNavigation';
import { AppLayout } from '@/components/AppLayout';
import { SideNavigation } from '@/components/SideNavigation';
import { BreadcrumbGroup } from '@/components/BreadcrumbGroup';

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

export type Props<T> = {
	children: T,
	params: {
		nav: 'closed' | 'open'
		tools: 'closed' | 'open',
	}
};

export default function RootLayout<T extends JSX.Element>({ children, params }: Props<T>) {
	return (
		<html lang="en">
			<body>
				<TopNavigation identity={identity} i18nStrings={i18nStrings} />
				<AppLayout
					navigation={<SideNavigation items={items} />}
					breadcrumbs={<BreadcrumbGroup items={items} />}
					content={children}
				/>
			</body>
		</html>
	);
}
