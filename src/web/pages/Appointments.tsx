import React, { useState } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import axios from 'axios';

interface Appointment {
  id: string;
  date: string;
  service: string;
  clientName: string;
  status: 'pending' | 'confirmed' | 'cancelled';
}

export default function Appointments() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedService, setSelectedService] = useState('');
  const [name, setName] = useState('');

  const { data: services } = useQuery({
    queryKey: ['services'],
    queryFn: () => axios.get('/api/services').then(res => res.data)
  });

  const createAppointment = useMutation({
    mutationFn: (newAppointment: Omit<Appointment, 'id' | 'status'>) =>
      axios.post('/api/appointments', newAppointment),
    onSuccess: () => {
      setSelectedDate(new Date());
      setSelectedService('');
      setName('');
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createAppointment.mutate({
      date: selectedDate.toISOString(),
      service: selectedService,
      clientName: name
    });
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Book an Appointment</h1>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Date</label>
          <input
            type="date"
            value={format(selectedDate, 'yyyy-MM-dd')}
            onChange={(e) => setSelectedDate(new Date(e.target.value))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Service</label>
          <select
            value={selectedService}
            onChange={(e) => setSelectedService(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="">Select a service</option>
            {services?.map((service: any) => (
              <option key={service.id} value={service.id}>
                {service.name} - ${service.price}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Your Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Book Appointment
        </button>
      </form>
    </div>
  );
}