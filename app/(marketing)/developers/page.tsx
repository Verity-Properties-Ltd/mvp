"use client";

import { useState } from "react";
import Footer from "@/components/Footer";
import ReportOrderModal from "@/components/ReportOrderModal";
import Navbar from "@/components/Navbar";
import HowItWorks from "@/components/HowItWorks";
import Pricing from "@/components/Pricing";
import FAQ from "@/components/FAQ";
import DeveloperHero from "./components/DeveloperHero";
import DeveloperProblem from "./components/DeveloperProblem";



export default function DeveloperPage() {
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
            <Navbar onOpenModal={() => openModal()} />
            <main>
                <DeveloperHero onOpenModal={() => openModal()} />
                <DeveloperProblem />
                <HowItWorks />
                <Pricing onOpenModal={openModal} />
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