import Navbar from '../Components/Navbar'
import Slider from '../Components/Slider'
import Category from '../Components/Category'
import { categories, discountCategory, products } from '../data'
import ProSlider from '../Components/ProSlider'
import Newsletter from '../Components/Newsletter'
import Footer from '../Components/Footer'
import Announcement from '../Components/Announcement'


const Home = () => {
    document.body.style.overflowY = "scroll";
    return (
        <>
            <Announcement />
            <Navbar />
            <Slider />
            <Category data={discountCategory} type="discount"/>
            <ProSlider data={products} title="TRENDING PRODUCT"/>
            <Category data={categories} type="category"/>
            <Newsletter />
            <Footer />
        </>
    )
}

export default Home
