// App.tsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { NotesProvider } from "./NotesContext";
import Sidebar from "./sidebar/Sidebar";
import Barchasi from "./components/Barchasi";
import Ish from "./components/Ish";
import Shaxsiy from "./components/Shaxsiy";
import Oqish from "./components/Oqish";
import Goya from "./components/Goya";


function App() {
  return (
    <Router>
      <NotesProvider>
        <div
          style={{
            display: "flex",
            minHeight: "100vh",
            backgroundColor: "#f5f7fa",
          }}
        >
          <Sidebar />
          <div
            style={{
              flex: 1,
              marginLeft: "280px",
              overflow: "auto",
            }}
          >
            <Routes>
              <Route path="/" element={<Barchasi />} />
              <Route path="/barchasi" element={<Barchasi />} />
              <Route path="/ish" element={<Ish />} />
              <Route path="/shaxsiy" element={<Shaxsiy />} />
              <Route path="/oqish" element={<Oqish />} />
              <Route path="/goya" element={<Goya />} />
            </Routes>
          </div>
        </div>
      </NotesProvider>
    </Router>
  );
}

export default App;
