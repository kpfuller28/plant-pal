import Footer from "./Components/Footer";
import Header from "./Components/Header";
import Body from "./Components/Body";

function App() {
  return (
    <div className="min-h-screen bg-background text-text font-sans flex flex-col transition-all duration-700">
      <Header />
      <main className="flex-grow">
        <Body />
      </main>
      <Footer />
    </div>
  );
}

export default App;
