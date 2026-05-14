"use client";

import { useState } from "react";
import Navbar from "./Navbar";
import Hero from "./Hero";
import Footer from "./Footer";
import ReportOrderModal from "./ReportOrderModal";
import TwoPaths from "./TwoPaths";
import WhyUs from "./Whyus";
import WaitlistForm from "./WaitlistForm";



export default function WaitlistPage() {
    const [modalOpen, setModalOpen] = useState(false);
    const [preSelectedTier, setPreSelectedTier] = useState<string | undefined>();

    const openModal = (tier?: string) => {
        setPreSelectedTier(tier);
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
        setPreSelectedTier(undefined);
    };

    return (
        <>
            <Navbar />
            <main>
                <Hero />
                <TwoPaths />
                <WhyUs />
                <WaitlistForm />
                {/* <Problem />
                <HowItWorks />
                <Pricing onOpenModal={openModal} />
                <Trust />
                <FAQ /> */}
            </main>
            <Footer onOpenModal={() => openModal()} />
            <ReportOrderModal
                isOpen={modalOpen}
                onClose={closeModal}
                preSelectedTier={preSelectedTier}
            />
        </>
    );
}