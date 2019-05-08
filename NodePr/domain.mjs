import server from "./server.mjs";
import domain from "domain";

const serverDomain = domain.create();

serverDomain.on("error", (err) => {
  console.error(`server err: ${err}`);
});

serverDomain.run(() => {
  server.listen(3000);
});
