import { Wizard } from '@/components/Wizard';

export const metadata = {
	title: 'Home'
};

export default function App() {
	return (
		<Wizard
			steps={[{
				title: 'Bitmovin API Key',
				description: (<p>{'Your API Key'}</p>),
				content: (<p>{'All good'}</p>),
				info: 'Sure thing',
			}]}
		/>
	);
}


