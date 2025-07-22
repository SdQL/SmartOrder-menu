import { useEffect, useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getData } from "../data/menu.js";
import { Flame, Clock } from "lucide-react";
import CallWaiter from "./CallWaiter.js";
import { BrowserRouter } from "react-router-dom";

type MenuItem = {
  id: string;
  name: string;
  image: string;
  price: number;
  description: string;
  prepTime: string;
  popular?: boolean;
};

type Category = {
  id: string;
  name: string;
  items: MenuItem[];
};

export default function Menu() {
  const [activeCategory, setActiveCategory] = useState("main-course");
  const [data, setData] = useState<Category[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const fetchData = await getData();
      setData(fetchData);
    };
    fetchData();
  }, []);

  return (
    <BrowserRouter>
      <main className="container mx-auto px-4 py-8">
        <Tabs
          value={activeCategory}
          onValueChange={setActiveCategory}
          className="w-full items-center"
        >
          <TabsList className="grid grid-cols-4 mb-8 bg-transparent gap-x-4">
            {data.map((category) => (
              <TabsTrigger
                value={category.id}
                key={category.id}
                className="data-[state=active]:border-b-orange-400 data-[state=active]:bg-transparent cursor-pointer hover:scale-105"
              >
                {category.name}
              </TabsTrigger>
            ))}
          </TabsList>

          {data.map((category) => (
            <TabsContent key={category.id} value={category.id}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {category.items.map((item) => (
                  <Card
                    key={item.id}
                    className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white"
                  >
                    <div className="relative">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-48 object-cover"
                      />
                      {item.popular && (
                        <Badge className="absolute top-2 left-2 bg-yellow-400 text-red-600 font-semibold">
                          <Flame className="w-3 h-3 " />
                          Popular
                        </Badge>
                      )}
                      <div className="absolute top-2 right-2 bg-white/90 rounded-full px-2 py-1 flex items-center font-medium text-gray-600 text-xs">
                        <Clock className="w-3 h-3 mr-1" />
                        {item.prepTime}
                      </div>
                    </div>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg font-bold text-gray-800 flex flex-col">
                        <p>{item.name}</p>
                        <span className="text-sm text-gray-600 font-medium">
                          {item.price} COP
                        </span>
                      </CardTitle>
                      <CardDescription className="text-sm text-gray-600 line-clamp-2">
                        {item.description}
                      </CardDescription>
                    </CardHeader>
                  </Card>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
        <CallWaiter />
      </main>
    </BrowserRouter>
  );
}
