import Box from "@/components/client/Box";
import intlFormat from "date-fns/intlFormat";

function formatDate(startTime: Date) {
	return intlFormat(startTime, {
		year: "2-digit",
		month: "2-digit",
		day: "2-digit",
		hour: "2-digit",
		minute: "2-digit",
		second: "2-digit",
		hour12: false,
	});
}

export default function Time({ time }: { time: Date }) {
	return (
		<Box>
			<time>{formatDate(time)}</time>
		</Box>
	);
}
