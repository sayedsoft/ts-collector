import { AppContract } from "./app.contract";

interface AppProviderOptions {
  hideLogs?: boolean;
  // Add other options as needed
}

export class AppProvider {
  private data: AppContract;
  private options: AppProviderOptions;

  constructor(data: AppContract, options?: AppProviderOptions) {
    this.data = data;
    this.options = {
      hideLogs: false, // Default value for hideLogs
      ...options, // Override default values with provided options
    };
  }

  // Hooks and other methods...

  private log(message: string): void {
    if (!this.options.hideLogs) {
      console.log(message);
    }
  }

  beforeBoot(): void {
    // Implement any logic to execute before boot()
    console.log("Before boot");
  }

  afterBoot(): void {
    // Implement any logic to execute after boot()
    console.log("After boot");
  }

  beforeRegister(): void {
    // Implement any logic to execute before register()
    console.log("Before register");
  }

  afterRegister(): void {
    // Implement any logic to execute after register()
    console.log("After register");
  }

  private runForever(): void {
    // Implement the main application logic that runs forever

    // Call the main logic again after a delay (e.g., 5 seconds)
    setTimeout(() => this.runForever(), 5000);
  }

  run(): void {
    this.log("Running the application...");

    if (this.data.runForever) {
      this.runForever();
    } else {
      // Implement the main application logic that runs once
    }
  }
}
