import CTASection from "../components/landing/CTASection";
import Features from "../components/landing/Features";
import Hero from "../components/landing/Hero";
import Showcase from "../components/landing/ShowCase";
import Testimonials from "../components/landing/Testimonials";

export default function Landing() {
    return (
        <>
            <Hero />
            <Features />
            <Showcase />
            <Testimonials />
            <CTASection />

            <div className="py-10"></div>
        </>
    )
}