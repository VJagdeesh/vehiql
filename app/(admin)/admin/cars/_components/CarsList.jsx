"use client";
import { deleteCar, getCars, updateCarStatus } from "@/actions/cars";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useFetch } from "@/hooks/use-fetch";
import { formatCurrency } from "@/lib/helper";
import { CarIcon, Loader2, Plus, Search, Star, StarOff } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

const CarsList = () => {
  const router = useRouter();
  const [search, setSearch] = useState("");

  const {
    fn: fetchCars,
    data: carsData,
    isLoading: carsLoading,
    error: carsError,
  } = useFetch(getCars);

  useEffect(() => {
    fetchCars(search);
  }, [search]);

  const {
    fn: deleteCarFn,
    data: deleteCarResult,
    isLoading: deleteCarLoading,
    error: deleteCarError,
  } = useFetch(deleteCar);

  const {
    fn: updateCarFn,
    data: updateCarResult,
    isLoading: updateCarLoading,
    error: updateCarError,
  } = useFetch(updateCarStatus);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
  };

  const getStatus = (status) => {
    switch (status) {
      case "AVAILABLE":
        return (
          <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
            Available
          </Badge>
        );
      case "UNAVAILABLE":
        return (
          <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100">
            Unavailable
          </Badge>
        );
      case "SOLD":
        return (
          <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">
            Sold
          </Badge>
        );
    }
  };

  const handletoggleFeatured = async (car) => {
    await updateCarFn(car.id, { featured: !car.featured });
  };

  useEffect(() => {
    if (updateCarResult?.success) {
      toast.success("Car status updated successfully");
      fetchCars(search);
    }
  }, [updateCarResult]);

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <Button
          onClick={() => router.push("/admin/cars/create")}
          className="flex items-center cursor-pointer"
        >
          <Plus className="h-6 w-4" /> Add Car
        </Button>
        <form onSubmit={handleSearchSubmit} className="flex w-full sm:w-auto">
          <div className="relative flex-1">
            <Search className="absolute top-2.5 left-2.5 h-4 w-4 text-gray-500" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              type="search"
              placeholder="Search your cars..."
              className="pl-9 w-full sm:w-60"
            />
          </div>
        </form>
      </div>
      <Card>
        <CardContent className="p-0">
          {!carsLoading && carsData?.length > 0 ? (
            <div>
              <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
            </div>
          ) : (
            <div>
              {carsData?.success && carsData?.data?.length > 0 ? (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-12"></TableHead>
                        <TableHead>Make & Model</TableHead>
                        <TableHead>Year</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Featured</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {carsData?.data?.map((car) => {
                        return (
                          <TableRow key={car?.id}>
                            <TableCell className="w-10 h-10 rounded-md overflow-hidden">
                              {car?.images && car?.images.length > 0 ? (
                                <Image
                                  src={car.images[0]}
                                  alt={`${car?.make} ${car?.model}`}
                                  height={40}
                                  width={40}
                                  className="object-cover w-full h-full"
                                  priority
                                />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center bg-gray-200">
                                  <CarIcon className="h-6 w-6 text-gray-400" />
                                </div>
                              )}
                            </TableCell>
                            <TableCell className="font-medium">
                              {car.make} {car.model}
                            </TableCell>
                            <TableCell>{car.year}</TableCell>
                            <TableCell>{formatCurrency(car.price)}</TableCell>
                            <TableCell>{getStatus(car.status)}</TableCell>
                            <TableCell>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="p-0 h-9 w-9"
                                onClick={() => handletoggleFeatured(car)}
                                disabled={updateCarLoading}
                              >
                                {car.featured ? (
                                  <Star className="h-5 w-5 text-amber-500 fill-amber-500" />
                                ) : (
                                  <StarOff className="h-5 w-5 text-gray-400" />
                                )}
                              </Button>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </div>
              ) : (
                <div></div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default CarsList;
