"use client";

import { useState } from "react";
import Navbar from "./Navbar";
import Hero from "./Hero";
import Footer from "./Footer";
import ReportOrderModal from "./ReportOrderModal";
import HowItWorks from "./HowItWorks";
import Pricing from "./Pricing";
import Trust from "./Trust";
import FAQ from "./FAQ";
import Problem from "./Problem";


export default function LandingPage() {
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
                <Problem />
                <HowItWorks />
                <Pricing onOpenModal={openModal} />
                <Trust />
                <FAQ />
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