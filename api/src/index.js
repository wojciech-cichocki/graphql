import server from "./server";

const port = 4000;

const serverConfig = {
  port
};

const startServer = async () => {
  await server.start(serverConfig);
  console.log(`http://localhost:${port}/`);
};

startServer();
