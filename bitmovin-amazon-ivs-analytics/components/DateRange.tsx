import DateRangePicker, { DateRangePickerProps } from "@cloudscape-design/components/date-range-picker";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
type Value = DateRangePickerProps.AbsoluteValue | null;

export const useDateRange = (initialState: Value) => {
  return useState<Value>(initialState)
}

export const DateRange = ({value, setValue}: {value: Value, setValue: (value: Value) => void}) => <DateRangePicker
    onChange={(event) => event.detail.value?.type === 'absolute' ? setValue(event.detail.value) : {}}
    value={value}
    isValidRange={(range) => (range ?
      { valid: true } :
      { valid: false, errorMessage: 'Invalid range' }
    )}
    relativeOptions={[]}
    i18nStrings={{
      todayAriaLabel: "Today",
      nextMonthAriaLabel: "Next month",
      previousMonthAriaLabel: "Previous month",
      customRelativeRangeDurationLabel: "Duration",
      customRelativeRangeDurationPlaceholder: "Enter duration",
      customRelativeRangeOptionLabel: "Custom range",
      customRelativeRangeOptionDescription: "Set a custom range in the past",
      customRelativeRangeUnitLabel: "Unit of time",
      formatRelativeRange: e => {
        const n = 1 === e.amount ? e.unit : `${e.unit}s`;
        return `Last ${e.amount} ${n}`;
      },
      formatUnit: (e, n) => (1 === n ? e : `${e}s`),
      dateTimeConstraintText: "Range is 6 to 30 days. For date, use YYYY/MM/DD. For time, use 24 hr format.",
      relativeModeTitle: "Relative range",
      absoluteModeTitle: "Absolute range",
      relativeRangeSelectionHeading: "Choose a range",
      startDateLabel: "Start date",
      endDateLabel: "End date",
      startTimeLabel: "Start time",
      endTimeLabel: "End time",
      clearButtonLabel: "Clear and dismiss",
      cancelButtonLabel: "Cancel",
      applyButtonLabel: "Apply"
  }} />;
