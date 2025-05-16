import { StrictMode } from "react";
import { AppRegistry } from "react-native";
import App from "./App";
import { UserProvider } from "./src/context/UserContext";

function Main() {
  return (
    <StrictMode>
      <UserProvider>
        <App />
      </UserProvider>
    </StrictMode>
  );
}

AppRegistry.registerComponent("main", () => Main);
