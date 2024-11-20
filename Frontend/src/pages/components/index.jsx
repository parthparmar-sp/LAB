import Featurecard from "./feature-card/featurecard"
import Footer from "./footer/footer"
import Header from "./header/header"
import Herosection from "./hero-section/herosection"

function index() {
  return (
    <>
    <Header/>
    <Herosection/>
    <Featurecard/>
    <Footer/>
    </>
  )
}

export default index


// function MainPage() {
//   const [showRegistration, setShowRegistration] = useState(false);

//   return (
//     <div className="flex flex-col min-h-screen bg-blue-50">
//       <Header />
//       {!showRegistration && <HeroSection onGetStarted={() => setShowRegistration(true)} />}
//       {showRegistration && <RegistrationSection />}
//       <FeatureCards />
//       <Footer />
//     </div>
//   );
// }

// export default MainPage;
