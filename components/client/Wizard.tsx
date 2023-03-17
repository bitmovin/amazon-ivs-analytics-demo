'use client';

import Wizard, { WizardProps } from '@cloudscape-design/components/wizard';
import React from 'react';

if (typeof window === 'undefined') {
	React.useLayoutEffect = () => ({});
}

export default function ClientWizard({i18nStrings, ...props}: Partial<WizardProps>) {

	return (
		<Wizard {...props}
			steps={props.steps || []}
			i18nStrings={{
				stepNumberLabel: (step) => `${step}`,
				collapsedStepsLabel: (step, count) => `${step}/${count}`,
				nextButton: 'Next',
				cancelButton: 'Cancel',
				previousButton: 'Previous',
				submitButton: 'Submit',
				...i18nStrings,
			}}
		/>
	);
}