import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getServices } from '../services/api';

interface Service {
  id: string;
  name: string;
  price: number;
  duration: number;
  description: string;
}

export default function Services() {
  const { data: services, isLoading } = useQuery<Service[]>({
    queryKey: ['services'],
    queryFn: () => getServices().then(res => res.data)
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Our Services</h1>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {services?.map((service) => (
          <div key={service.id} className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg font-medium text-gray-900">{service.name}</h3>
              <p className="mt-1 text-sm text-gray-500">{service.description}</p>
              <div className="mt-4">
                <span className="text-2xl font-semibold text-gray-900">${service.price}</span>
                <span className="ml-2 text-sm text-gray-500">{service.duration} min</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}