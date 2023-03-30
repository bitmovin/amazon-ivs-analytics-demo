import { Route } from "next";

declare type RouteMap<T> = { [route in Route]: T };

function mapRoutes<T>(map: RouteMap<T>) {
	return map;
}

const routeTitles: RouteMap<string> = {
	"/": "Login",
	"/dashboard": "Dashboard",
	"/dashboard/sessions": "Sessions",
	"/dashboard/stream-sessions": "Stream Sessions",
};
