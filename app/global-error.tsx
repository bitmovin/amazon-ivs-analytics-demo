"use client";

export default function ErrorPage(props: { error: Error }) {
	return <p>{props.error.message}</p>;
}
