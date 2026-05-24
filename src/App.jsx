import { Navigation } from "./components/Navigation/Navigation";
import { Hero } from "./components/Hero/Hero";
import { ServicesGrid } from "./components/ServicesGrid/ServicesGrid";
import { WorksSlider } from "./components/WorksSlider/WorksSlider";
import { PriceBlock } from "./components/PriceBlock/PriceBlock";
import { FAQ } from "./components/FAQ/FAQ";
import { Contacts } from "./components/Contacts/Contacts";
import { Footer } from "./components/Footer/Footer";
function App() {
  return (
    <>
      <Navigation />
      <Hero />
      <ServicesGrid />
      <WorksSlider />
      <PriceBlock />
      <FAQ />
      <Contacts />
      <Footer />
    </>
  );
}

export default App;
