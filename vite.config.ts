import react from "@vitejs/plugin-react";
import { defineConfig, loadEnv } from "vite";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd()); // Load environment variables based on the mode

  return {
    plugins: [react()],
    server: {
      host: "0.0.0.0", // Bind to all available network interfaces
      port: 5173, // Specify the port (optional)
      open: true, // Automatically open the app in the browser
    },
    define: {
      // Set the global variable based on the environment variable
      __SOURCE_FILE__: env.VITE_SOURCE_FILE === "false",
    },
    build: {
      sourcemap: env.VITE_SOURCE_FILE === "false" ? false : true, // Disable source maps based on the variable
    },
  };
});
