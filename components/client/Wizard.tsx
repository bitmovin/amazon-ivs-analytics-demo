"use client";

import Wizard, { WizardProps } from "@cloudscape-design/components/wizard";

type Props = Omit<WizardProps, 'i18nStrings'>

export default function(props: Props) {
  return (
    <Wizard {...props} i18nStrings={{
        cancelButton: 'Cancel',
        nextButton: 'Next',
        previousButton: 'Previous',
        submitButton: 'Submit',
        collapsedStepsLabel: (stepNumber, stepsCount) => `${stepNumber}/${stepsCount}`,
        stepNumberLabel: (stepNumber) => stepNumber.toString(),
    }} />
  );
}