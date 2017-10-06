import {execute, subscribe} from "graphql";
import http, {createServer} from "http";
import {app, PORT} from "./server";
import schema from "./schema";

const server = http.createServer(app);
let currentApp = app;

server.listen(PORT, () => {
	console.log(`GraphQL-server listening on port ${PORT}.`)
});

if (module.hot) {
	module.hot.accept(["./server", "./schema"], () => {
		server.removeListener("request", currentApp);
		server.on("request", app);
		currentApp = app;
	});
}
