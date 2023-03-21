import { fetchLicenseKeys, fetchOrganization } from "@/server/bitmovin";

import { redirect } from "@/server/routes";

export const metadata = {
	title: "Lists",
};

import Spinner from "@/client/Spinner";
import Header from "@/client/Header";
import Board from "@/client/Board";
import BoardItem from "@/client/BoardItem";
import Box from "@/client/Box";
import Button from "@/client/Button";

import LineChart from "@/client/LineChart";
import AreaChart from "@/client/AreaChart";
import BarChart from "@/client/BarChart";
import PieChart from "@/client/PieChart";

export default async function Page({
	params: { tenant },
}: {
	params: { tenant: string };
}) {
	const licenses = await fetchLicenseKeys(
		{
			limit: 10,
			offset: 0,
		},
		tenant,
		{
			next: { revalidate: 10000 },
		}
	);

	if (!licenses.items) {
		redirect("/");
	}

	return (
		<section>
			<Board
				empty={<Spinner size="large" />}
				items={licenses.items
					.flatMap((license) => [
						{ license, chart: "bar" },
						{ license, chart: "line" },
						{ license, chart: "area" },
						{ license, chart: "pie" },
					])
					.map(({ license, chart }) => ({
						id: `${license.id!}_${chart}`,
						definition: {
							defaultColumnSpan: 2,
							defaultRowSpan: 4,
							minColumnSpan: 2,
							minRowSpan: 4,
						},
						columnSpan: 2,
						rowSpan: 4,
						data: {
							element: (
								<BoardItem
									header={<Header>{license.name}</Header>}
									i18nStrings={{
										dragHandleAriaLabel: "",
										resizeHandleAriaLabel: "",
									}}
								>
									{chart === "bar" ? (
										<BarChart
											height={200}
											yScaleType="linear"
											xScaleType="categorical"
											series={[
												{
													title: "Site 1",
													type: "bar",
													data: [
														{
															x: 1601089200000,
															y: 34503,
														},
														{
															x: 1601096400000,
															y: 25832,
														},
														{
															x: 1601103600000,
															y: 4012,
														},
														{
															x: 1601110800000,
															y: -5602,
														},
														{
															x: 1601118000000,
															y: 17839,
														},
													],
												},
												{
													title: "Average revenue",
													type: "threshold",
													y: 19104,
												},
											]}
											xDomain={[
												1601089200000, 1601096400000,
												1601103600000, 1601110800000,
												1601118000000,
											]}
											yDomain={[-10000, 40000]}
											i18nStrings={{
												filterLabel:
													"Filter displayed data",
												filterPlaceholder:
													"Filter data",
												filterSelectedAriaLabel:
													"selected",
												detailPopoverDismissAriaLabel:
													"Dismiss",
												legendAriaLabel: "Legend",
												chartAriaRoleDescription:
													"line chart",
											}}
										/>
									) : chart === "line" ? (
										<LineChart
											height={200}
											series={[
												{
													title: "Site 1",
													type: "line",
													data: [
														{
															x: 1601002800000,
															y: 58020,
														},
														{
															x: 1601003700000,
															y: 102402,
														},
														{
															x: 1601004600000,
															y: 104920,
														},
														{
															x: 1601005500000,
															y: 94031,
														},
														{
															x: 1601006400000,
															y: 125021,
														},
														{
															x: 1601007300000,
															y: 159219,
														},
														{
															x: 1601008200000,
															y: 193082,
														},
														{
															x: 1601009100000,
															y: 162592,
														},
														{
															x: 1601010000000,
															y: 274021,
														},
														{
															x: 1601010900000,
															y: 264286,
														},
														{
															x: 1601011800000,
															y: 289210,
														},
														{
															x: 1601012700000,
															y: 256362,
														},
														{
															x: 1601013600000,
															y: 257306,
														},
														{
															x: 1601014500000,
															y: 186776,
														},
														{
															x: 1601015400000,
															y: 294020,
														},
														{
															x: 1601016300000,
															y: 385975,
														},
														{
															x: 1601017200000,
															y: 486039,
														},
														{
															x: 1601018100000,
															y: 490447,
														},
														{
															x: 1601019000000,
															y: 361845,
														},
														{
															x: 1601019900000,
															y: 339058,
														},
														{
															x: 1601020800000,
															y: 298028,
														},
														{
															x: 1601021700000,
															y: 231902,
														},
														{
															x: 1601022600000,
															y: 224558,
														},
														{
															x: 1601023500000,
															y: 253901,
														},
														{
															x: 1601024400000,
															y: 102839,
														},
														{
															x: 1601025300000,
															y: 234943,
														},
														{
															x: 1601026200000,
															y: 204405,
														},
														{
															x: 1601027100000,
															y: 190391,
														},
														{
															x: 1601028000000,
															y: 183570,
														},
														{
															x: 1601028900000,
															y: 162592,
														},
														{
															x: 1601029800000,
															y: 148910,
														},
														{
															x: 1601030700000,
															y: 229492,
														},
														{
															x: 1601031600000,
															y: 293910,
														},
													],
												},
												{
													title: "Peak hours",
													type: "threshold",
													x: 1601021400000,
												},
											]}
											xDomain={[
												1601002800000, 1601031600000,
											]}
											yDomain={[0, 500000]}
											i18nStrings={{
												filterLabel:
													"Filter displayed data",
												filterPlaceholder:
													"Filter data",
												filterSelectedAriaLabel:
													"selected",
												detailPopoverDismissAriaLabel:
													"Dismiss",
												legendAriaLabel: "Legend",
												chartAriaRoleDescription:
													"line chart",
											}}
											ariaLabel="Single data series line chart"
											errorText="Error loading data."
											loadingText="Loading chart"
											recoveryText="Retry"
											empty={
												<Box
													textAlign="center"
													color="inherit"
												>
													<b>No data available</b>
													<Box
														variant="p"
														color="inherit"
													>
														There is no data
														available
													</Box>
												</Box>
											}
											noMatch={
												<Box
													textAlign="center"
													color="inherit"
												>
													<b>No matching data</b>
													<Box
														variant="p"
														color="inherit"
													>
														There is no matching
														data to display
													</Box>
													<Button>
														Clear filter
													</Button>
												</Box>
											}
										/>
									) : chart === "area" ? (
										<AreaChart
											height={200}
											series={[
												{
													title: "Network 1",
													type: "area",
													data: [
														{
															x: 1601002800000,
															y: 114489,
														},
														{
															x: 1601003700000,
															y: 136935,
														},
														{
															x: 1601004600000,
															y: 141026,
														},
														{
															x: 1601005500000,
															y: 123288,
														},
														{
															x: 1601006400000,
															y: 121956,
														},
														{
															x: 1601007300000,
															y: 119868,
														},
														{
															x: 1601008200000,
															y: 132326,
														},
														{
															x: 1601009100000,
															y: 126879,
														},
														{
															x: 1601010000000,
															y: 138543,
														},
														{
															x: 1601010900000,
															y: 144309,
														},
														{
															x: 1601011800000,
															y: 121118,
														},
														{
															x: 1601012700000,
															y: 113430,
														},
														{
															x: 1601013600000,
															y: 135911,
														},
														{
															x: 1601014500000,
															y: 113126,
														},
														{
															x: 1601015400000,
															y: 119538,
														},
														{
															x: 1601016300000,
															y: 124338,
														},
														{
															x: 1601017200000,
															y: 133884,
														},
														{
															x: 1601018100000,
															y: 135473,
														},
														{
															x: 1601019000000,
															y: 131187,
														},
														{
															x: 1601019900000,
															y: 136176,
														},
														{
															x: 1601020800000,
															y: 144422,
														},
														{
															x: 1601021700000,
															y: 115392,
														},
														{
															x: 1601022600000,
															y: 139307,
														},
														{
															x: 1601023500000,
															y: 128517,
														},
														{
															x: 1601024400000,
															y: 107160,
														},
														{
															x: 1601025300000,
															y: 110283,
														},
														{
															x: 1601026200000,
															y: 134513,
														},
														{
															x: 1601027100000,
															y: 111311,
														},
														{
															x: 1601028000000,
															y: 142686,
														},
														{
															x: 1601028900000,
															y: 130652,
														},
														{
															x: 1601029800000,
															y: 149418,
														},
														{
															x: 1601030700000,
															y: 121923,
														},
													],
												},
												{
													title: "Network 2",
													type: "area",
													data: [
														{
															x: 1601002800000,
															y: 10413,
														},
														{
															x: 1601003700000,
															y: 26582,
														},
														{
															x: 1601004600000,
															y: 45593,
														},
														{
															x: 1601005500000,
															y: 65918,
														},
														{
															x: 1601006400000,
															y: 76223,
														},
														{
															x: 1601007300000,
															y: 62385,
														},
														{
															x: 1601008200000,
															y: 83330,
														},
														{
															x: 1601009100000,
															y: 127209,
														},
														{
															x: 1601010000000,
															y: 104802,
														},
														{
															x: 1601010900000,
															y: 145899,
														},
														{
															x: 1601011800000,
															y: 121375,
														},
														{
															x: 1601012700000,
															y: 112968,
														},
														{
															x: 1601013600000,
															y: 145263,
														},
														{
															x: 1601014500000,
															y: 139562,
														},
														{
															x: 1601015400000,
															y: 128343,
														},
														{
															x: 1601016300000,
															y: 122774,
														},
														{
															x: 1601017200000,
															y: 145396,
														},
														{
															x: 1601018100000,
															y: 176509,
														},
														{
															x: 1601019000000,
															y: 201006,
														},
														{
															x: 1601019900000,
															y: 196538,
														},
														{
															x: 1601020800000,
															y: 213773,
														},
														{
															x: 1601021700000,
															y: 205076,
														},
														{
															x: 1601022600000,
															y: 216369,
														},
														{
															x: 1601023500000,
															y: 159386,
														},
														{
															x: 1601024400000,
															y: 238852,
														},
														{
															x: 1601025300000,
															y: 207500,
														},
														{
															x: 1601026200000,
															y: 187110,
														},
														{
															x: 1601027100000,
															y: 314165,
														},
														{
															x: 1601028000000,
															y: 165653,
														},
														{
															x: 1601028900000,
															y: 175584,
														},
														{
															x: 1601029800000,
															y: 230042,
														},
														{
															x: 1601030700000,
															y: 293879,
														},
													],
												},
											]}
											xDomain={[
												1601002800000, 1601030700000,
											]}
											yDomain={[0, 500000]}
											i18nStrings={{
												filterLabel:
													"Filter displayed data",
												filterPlaceholder:
													"Filter data",
												filterSelectedAriaLabel:
													"selected",
												detailPopoverDismissAriaLabel:
													"Dismiss",
												legendAriaLabel: "Legend",
												chartAriaRoleDescription:
													"line chart",
												detailTotalLabel: "Total",
											}}
											ariaLabel="Stacked area chart"
											errorText="Error loading data."
											empty={
												<Box
													textAlign="center"
													color="inherit"
												>
													<b>No data available</b>
													<Box
														variant="p"
														color="inherit"
													>
														There is no data
														available
													</Box>
												</Box>
											}
											noMatch={
												<Box
													textAlign="center"
													color="inherit"
												>
													<b>No matching data</b>
													<Box
														variant="p"
														color="inherit"
													>
														There is no matching
														data to display
													</Box>
													<Button>
														Clear filter
													</Button>
												</Box>
											}
										/>
									) : chart === "pie" ? (
										<PieChart
											data={[
												{
													title: "Running",
													value: 60,
												},
												{
													title: "Failed",
													value: 30,
												},
												{
													title: "In-progress",
													value: 10,
												},
												{
													title: "Pending",
													value: 0,
												},
											]}
											i18nStrings={{
												detailsValue: "Value",
												detailsPercentage: "Percentage",
												filterLabel:
													"Filter displayed data",
												filterPlaceholder:
													"Filter data",
												filterSelectedAriaLabel:
													"selected",
												detailPopoverDismissAriaLabel:
													"Dismiss",
												legendAriaLabel: "Legend",
												chartAriaRoleDescription:
													"pie chart",
												segmentAriaRoleDescription:
													"segment",
											}}
											ariaDescription="Pie chart showing how many resources are currently in which state."
											ariaLabel="Pie chart"
											errorText="Error loading data."
											loadingText="Loading chart"
											recoveryText="Retry"
											empty={
												<Box
													textAlign="center"
													color="inherit"
												>
													<b>No data available</b>
													<Box
														variant="p"
														color="inherit"
													>
														There is no data
														available
													</Box>
												</Box>
											}
											noMatch={
												<Box
													textAlign="center"
													color="inherit"
												>
													<b>No matching data</b>
													<Box
														variant="p"
														color="inherit"
													>
														There is no matching
														data to display
													</Box>
													<Button>
														Clear filter
													</Button>
												</Box>
											}
										/>
									) : (
										<div></div>
									)}
								</BoardItem>
							),
						},
					}))}
			/>
		</section>
	);
}
