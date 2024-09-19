import Footer from "../components/global/footer";
import Header from "../components/global/header";
import CarCollection from "./impressiveCollection";
import RentByBrands from "./RentByBrands";
import RentByType from "./rentByType";
import CarSearchCard from "./searchCard";
import Testimonials from "./testimonials";

function Landingpage() {
  return (
    <div>
      <Header />
      <CarSearchCard/>
      <RentByBrands />
      <RentByType/>
      <CarCollection/>
      <Testimonials />
      <Footer />
    </div>
  );
}

export default Landingpage;
