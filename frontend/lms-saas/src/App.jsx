import AppRoutes from "./routes/AppRoutes";
import AIAssistant from "./components/AIAssistant/AIAssistant";
import ChatBot from "./components/ChatBot/ChatBot";

function App() {
  return (
    <>
      <AppRoutes />
      <AIAssistant />
      <ChatBot />
    </>
  );
}

export default App;