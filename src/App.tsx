import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { CatalogSection } from './components/CatalogSection';
import { Advantages } from './components/Advantages';
import { ForWhom } from './components/ForWhom';
import { Contacts } from './components/Contacts';
import { WhereToBuy } from './components/WhereToBuy';
import { Reviews } from './components/Reviews';
import { CtaBlock } from './components/CtaBlock';
import { CookieBanner } from './components/CookieBanner';
import { CatalogPage } from './pages/CatalogPage';
import { PrivacyPage } from './pages/PrivacyPage';
import { ReviewsPage } from './pages/ReviewsPage';
import './App.css';

function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <CatalogSection />
      <Advantages />
      <ForWhom />
      <WhereToBuy />
      <Reviews />
      <CtaBlock />
      <Contacts />
    </>
  );
}

function ScrollToHash() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      const el = document.getElementById(hash.slice(1));
      el?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [pathname, hash]);
  return null;
}

export default function App() {
  return (
    <BrowserRouter basename="/toolshop">
      <div className="app">
        <ScrollToHash />
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/catalog" element={<CatalogPage />} />
            <Route path="/catalog/:categoryId" element={<CatalogPage />} />
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="/reviews" element={<ReviewsPage />} />
          </Routes>
        </main>
        <Footer />
        <CookieBanner />
      </div>
    </BrowserRouter>
  );
}
