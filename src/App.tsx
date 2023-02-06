import AppRoute from "./routes";
import UserProvider from "./providers/UserProvider";
import LoadingProvider from "./providers/LoadingProvider";
import "./services/SocketService";

function App() {
  return (
    <LoadingProvider>
      <UserProvider>
        <main>
          <AppRoute />
        </main>
      </UserProvider>
    </LoadingProvider>
  );
}

export default App;
