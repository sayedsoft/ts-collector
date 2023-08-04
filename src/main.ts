import dotenv from "dotenv";
dotenv.config();

import { AppContract } from "./app.contract";
import { AppProvider } from "./app.provider";

async function main() {
  const data: AppContract = {};

  // Options object to dynamically set various options (optional)
  const options = {
    hideLogs: true, // Set to `true` to hide logs, `false` to show logs
    // Add other options here
  };

  const provider = new AppProvider(data, options);
  provider.beforeBoot(); // Execute any logic before booting
  provider.run(); // Run the application forever (pass `true` to run forever)
  provider.beforeRegister(); // Execute any logic before registering
  provider.afterRegister(); // Execute any logic after registering
}

main().catch((error) => console.error(error));
