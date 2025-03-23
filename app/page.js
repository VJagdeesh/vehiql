import CarCard from "@/components/car-card";
import HomeSearch from "@/components/home-search";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { bodyTypes, carMakes, faqItems, featuredCars } from "@/lib/data";
import { SignedOut } from "@clerk/nextjs";
import { Calendar, Car, ChevronRight, Shield } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="pt-20 flex flex-col">
      {/* <HeroPage></HeroPage> */}
      <section className="relative py-16 md:py-28 lg:py-32 dotted-background">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8">
            <h1 className="text-5xl md:text-8xl mb-4 gradient-title">
              Find your dream car with AI search
            </h1>
            <p className="text-xl text-gray-500 mb-8 max-w-2xl mx-auto">
              Test drive your favorite cars by using advanced filters and AI
              search
            </p>
          </div>
          {/* Search */}
          <HomeSearch />
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center  mb-8">
            <h2 className="text-2xl font-bold">Featured cars</h2>
            <Button variant="ghost" className="flex items-center">
              <Link href="/cars" className="flex items-center">
                View all cars
                <ChevronRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredCars.map((car) => {
              return <CarCard key={car.id} car={car} />;
            })}
          </div>
        </div>
      </section>

      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center  mb-8">
            <h2 className="text-2xl font-bold">Browse by brands</h2>
            <Button variant="ghost" className="flex items-center">
              <Link href="/cars" className="flex items-center">
                View all brands
                <ChevronRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {carMakes.map((make) => {
              return (
                <Link
                  key={make.id}
                  href={`/cars?make=${make.name}`}
                  className="bg-white rounded-lg shadow p-4 text-center hover:shadow-lg transition cursor-pointer"
                >
                  <div className="h-16 w-auto mb-2 relative">
                    <Image
                      src={make.image}
                      alt={make.name}
                      fill
                      style={{ objectFit: "contain" }}
                    />
                  </div>
                  <h3 className="font-medium">{make.name}</h3>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-12">
            Why Choose Us
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 text-blue-700 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Car className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold mb-2">Wide Selection</h3>
              <p className="text-gray-600">
                Thousands of vehicles from trusted and authorized dealership
              </p>
            </div>

            <div className="text-center">
              <div className="bg-blue-100 text-blue-700 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Calendar className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold mb-2">Easy Test Ride</h3>
              <p className="text-gray-600">
                Book a trial ride with your favorite car, at your convenience
              </p>
            </div>

            <div className="text-center">
              <div className="bg-blue-100 text-blue-700 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold mb-2">Secure</h3>
              <p className="text-gray-600">
                All transactions are secure and encrypted for your peace of mind
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center  mb-8">
            <h2 className="text-2xl font-bold">Browse by brands</h2>
            <Button variant="ghost" className="flex items-center">
              <Link href="/cars" className="flex items-center">
                View all brands
                <ChevronRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {bodyTypes.map((type) => {
              return (
                <Link
                  key={type.id}
                  href={`/cars?bodyType=${type.name}`}
                  className="bg-white rounded-lg shadow p-4 text-center hover:shadow-lg transition cursor-pointer"
                >
                  <div className="h-16 w-auto mb-2 relative">
                    <Image
                      src={type.image}
                      alt={type.name}
                      fill
                      style={{ objectFit: "contain" }}
                    />
                  </div>
                  <h3 className="font-medium">{type.name}</h3>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-8">
            Frequently Asked Question's
          </h2>
          <Accordion type="single" collapsible>
            {faqItems.map((faq, index) => {
              return (
                <AccordionItem value={`item-${index}`} key={index}>
                  <AccordionTrigger className="cursor-pointer">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent>{faq.answer}</AccordionContent>
                </AccordionItem>
              );
            })}
          </Accordion>
        </div>
      </section>

      <section className="py-16 md:py-28 lg:py-32 dotted-background text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to find your dream cars?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied customers who found their dream car
            through our platform
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button variant="secondary" size="lg" asChild>
              <Link href="/cars" className="flex items-center">
                View all cars
                <ChevronRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
            <SignedOut>
              <Link href="/sign-up">
                <Button className="cursor-pointer" size="lg" asChild>
                  Sign In
                </Button>
              </Link>
            </SignedOut>
          </div>
        </div>
      </section>
    </div>
  );
}
