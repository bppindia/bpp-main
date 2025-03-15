// src/pages/events/Events.tsx
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, MapPin, Clock, Users } from 'lucide-react';
import MapChart from '@/components/maps/mapChart';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Main } from '@/components/layout/dashboard/main';

interface Event {
  id: number;
  title: string;
  date: string; // ISO format: YYYY-MM-DD
  time: string; // e.g., "10:00 AM - 12:00 PM"
  location: string; // City, State
  state: string; // Normalized state name for MapChart
  district?: string; // Optional for highlighting
  description: string;
  attendees?: number; // Optional
  type: 'upcoming' | 'past';
}

const eventsData: Event[] = [
  // Upcoming Events
  {
    id: 1,
    title: "State Leadership Summit",
    date: "2025-04-10",
    time: "09:00 AM - 03:00 PM",
    location: "Mumbai, Maharashtra",
    state: "maharashtra",
    district: "Mumbai",
    description: "Join us for a summit to discuss policy priorities and membership growth for Maharashtra.",
    attendees: 500,
    type: 'upcoming',
  },
  {
    id: 2,
    title: "Farmers' Rights Rally",
    date: "2025-04-20",
    time: "11:00 AM - 02:00 PM",
    location: "Ahmedabad, Gujarat",
    state: "gujarat",
    district: "Ahmedabad",
    description: "A rally to advocate for farmers' welfare and agricultural reforms in Gujarat.",
    type: 'upcoming',
  },
  {
    id: 3,
    title: "Youth Empowerment Workshop",
    date: "2025-05-05",
    time: "02:00 PM - 05:00 PM",
    location: "Bengaluru, Karnataka",
    state: "karnataka",
    description: "Engaging the youth of Karnataka in political activism and leadership training.",
    type: 'upcoming',
  },
  // Past Events
  {
    id: 4,
    title: "Membership Drive Kickoff",
    date: "2025-02-15",
    time: "10:00 AM - 01:00 PM",
    location: "Nagpur, Maharashtra",
    state: "maharashtra",
    district: "Nagpur",
    description: "Launched our 2025 membership drive with over 300 new members enrolled.",
    attendees: 350,
    type: 'past',
  },
  {
    id: 5,
    title: "Women’s Empowerment Conference",
    date: "2025-03-08",
    time: "09:00 AM - 04:00 PM",
    location: "Surat, Gujarat",
    state: "gujarat",
    district: "Surat",
    description: "Celebrated International Women’s Day with discussions on gender equality.",
    attendees: 600,
    type: 'past',
  },
];

const Events: React.FC = () => {
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  const upcomingEvents = eventsData.filter((event) => event.type === 'upcoming');
  const pastEvents = eventsData.filter((event) => event.type === 'past');

  const handleEventClick = (event: Event) => {
    setSelectedEvent(event);
  };

  return (
     <Main fixed>
           <div className="w-full mx-auto">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-2">Bharat Popular Party Events</h1>
        <p className="text-muted-foreground">
          Stay updated with our latest events across India. Join us to shape the future!
        </p>
      </div>

      {/* Tabs for Upcoming and Past Events */}
      <Tabs defaultValue="upcoming" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto">
          <TabsTrigger value="upcoming">Upcoming Events</TabsTrigger>
          <TabsTrigger value="past">Past Events</TabsTrigger>
        </TabsList>

        {/* Upcoming Events Tab */}
        <TabsContent value="upcoming" className="space-y-4">
          <div className="grid gap-6 md:grid-cols-2">
            {upcomingEvents.map((event) => (
              <Card
                key={event.id}
                className="cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() => handleEventClick(event)}
              >
                <CardHeader>
                  <CardTitle>{event.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <p className="flex items-center">
                      <Calendar className="w-4 h-4 mr-2" /> {new Date(event.date).toLocaleDateString()}
                    </p>
                    <p className="flex items-center">
                      <Clock className="w-4 h-4 mr-2" /> {event.time}
                    </p>
                    <p className="flex items-center">
                      <MapPin className="w-4 h-4 mr-2" /> {event.location}
                    </p>
                    {event.attendees && (
                      <p className="flex items-center">
                        <Users className="w-4 h-4 mr-2" /> Expected: {event.attendees.toLocaleString()}
                      </p>
                    )}
                    <p>{event.description}</p>
                  </div>
                  <Button className="mt-4">RSVP Now</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Past Events Tab */}
        <TabsContent value="past" className="space-y-4">
          <div className="grid gap-6 md:grid-cols-2">
            {pastEvents.map((event) => (
              <Card
                key={event.id}
                className="cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() => handleEventClick(event)}
              >
                <CardHeader>
                  <CardTitle>{event.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <p className="flex items-center">
                      <Calendar className="w-4 h-4 mr-2" /> {new Date(event.date).toLocaleDateString()}
                    </p>
                    <p className="flex items-center">
                      <Clock className="w-4 h-4 mr-2" /> {event.time}
                    </p>
                    <p className="flex items-center">
                      <MapPin className="w-4 h-4 mr-2" /> {event.location}
                    </p>
                    {event.attendees && (
                      <p className="flex items-center">
                        <Users className="w-4 h-4 mr-2" /> Attendees: {event.attendees.toLocaleString()}
                      </p>
                    )}
                    <p>{event.description}</p>
                  </div>
                  <Button variant="outline" className="mt-4">View Highlights</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Event Map Section */}
      {selectedEvent && (
        <div className="space-y-4">
          <Separator />
          <h2 className="text-2xl font-semibold">Event Location</h2>
          <Card>
            <CardContent className="p-0">
              <div className="h-[400px]">
                <MapChart state={selectedEvent.state} dist={selectedEvent.district} />
              </div>
            </CardContent>
          </Card>
          <p className="text-center text-muted-foreground">
            Selected Event: {selectedEvent.title} in {selectedEvent.location}
          </p>
        </div>
      )}

      {/* Call to Action */}
      <div className="text-center space-y-4">
        <h2 className="text-2xl font-semibold">Get Involved</h2>
        <p className="text-muted-foreground">
          Join the Bharat Progress Party to participate in our events and contribute to India’s future.
        </p>
        <div className="flex justify-center gap-4">
          <Button>Become a Member</Button>
          <Button variant="outline">Donate Now</Button>
        </div>
      </div>
    </div>
    </Main>
  );
};

export default Events;