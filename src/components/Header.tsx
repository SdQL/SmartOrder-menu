import FoodTabs from "@/components/FoodTabs";
import { Star, Clock, Users } from "lucide-react";
import { TypingText } from "@/components/animate-ui/text/typing";

export default function Header() {
    return (
        <>
            <header className="bg-gradient-to-r from-orange-400 to-orange-500 text-white py-12 shadow-lg shadow-orange-500/50">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-4xl font-bold mb-4">¡Nuestro Delicioso Menú!</h2>
                    <TypingText
                        className="text-xl text-red-100"
                        text="Descubre sabores únicos que te harán volver por más"
                        inViewMargin="20px"
                        cursor
                        cursorClassName="mx-1 bg-red-100 p-[2px] rounded-4xl"
                        delay={0.1}
                        loop={true}
                    />

                    <div className="flex justify-center space-x-8 text-sm mt-4">
                        <div className="flex items-center">
                            <Clock className="w-4 h-4 mr-2" />
                            Entrega rápida
                        </div>
                        <div className="flex items-center">
                            <Star className="w-4 h-4 mr-2" />
                            Calidad premium
                        </div>
                        <div className="flex items-center">
                            <Users className="w-4 h-4 mr-2" />
                            Para toda la familia
                        </div>
                    </div>
                </div>
            </header>
            <FoodTabs />
        </>
    );
}
