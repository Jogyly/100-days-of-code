import server from "./server.js";
import * as domain from "domain";

const serverDomain = domain.create();

serverDomain.on("error", (err: Error) => {
  console.error(`server err: ${err.message}`);
});

serverDomain.run(() => {
  server.listen(3000);
});
