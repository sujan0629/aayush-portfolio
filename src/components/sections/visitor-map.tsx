'use client';
import * as React from 'react';
import { ComposableMap, Geographies, Geography, Marker } from 'react-simple-maps';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../ui/card';
import { useToast } from '@/hooks/use-toast';
import type { Visitor } from '@/lib/data';
import { Skeleton } from '../ui/skeleton';
import { Loader2 } from 'lucide-react';

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

// Basic coordinates for some countries to place markers
const countryCoordinates: { [key: string]: { lon: number, lat: number } } = {
  Nepal: { lon: 85.3240, lat: 27.7172 },
  India: { lon: 78.9629, lat: 20.5937 },
  China: { lon: 104.1954, lat: 35.8617 },
  USA: { lon: -95.7129, lat: 37.0902 },
  Germany: { lon: 10.4515, lat: 51.1657 },
};

export function VisitorMap() {
    const [visitors, setVisitors] = React.useState<Visitor[]>([]);
    const [isLoading, setIsLoading] = React.useState(true);
    const [isClient, setIsClient] = React.useState(false);
    const { toast } = useToast();

 React.useEffect(() => {
  setIsClient(true);

  async function fetchVisitors() {
    try {
      const res = await fetch('/api/visitors');
      if (!res.ok) throw new Error("Failed to fetch visitor data");
      const data = await res.json();
      setVisitors(data);
    } catch (error) {
      console.error(error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Could not load visitor map data.'
      });
    } finally {
      setIsLoading(false);
    }
  }

  async function recordVisit() {
    try {
      await fetch('/api/visitors', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      });
    } catch (error) {
      console.error("Could not record visit", error);
    }
  }

  // Record visitor when they first load
  recordVisit();

  // Initial fetch
  fetchVisitors();

  // Poll every 5 seconds for live updates
  const interval = setInterval(fetchVisitors, 5000);
  return () => clearInterval(interval);

}, [toast]);

    
    if (!isClient) {
        return null;
    }

    const totalVisitors = visitors.reduce((acc, v) => acc + v.count, 0);

    return (
        <section id="visitor-map" className="py-16">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold tracking-tight">Global Visitors</h2>
                    <p className="text-lg text-muted-foreground mt-2">A breakdown of visitors from around the world.</p>
                </div>
                <Card>
                    <CardHeader className="text-center">
                        <CardTitle>Visitor Map</CardTitle>
                        <CardDescription>Total Visitors: {isLoading ? '...' : totalVisitors}</CardDescription>
                    </CardHeader>
                    <CardContent className="p-4 flex flex-col items-center">
                       {isLoading ? (
                           <div className="w-full h-auto border rounded-lg overflow-hidden flex items-center justify-center bg-muted" style={{height: '500px'}}>
                               <Loader2 className="h-8 w-8 animate-spin text-primary" />
                           </div>
                       ) : (
                       <div className="w-full h-auto border rounded-lg overflow-hidden">
                            <ComposableMap projectionConfig={{ scale: 147 }}>
                                <Geographies geography={geoUrl}>
                                    {({ geographies }) =>
                                    geographies.map((geo) => (
                                        <Geography
                                        key={geo.rsmKey}
                                        geography={geo}
                                        fill="#EAEAEC"
                                        stroke="#D6D6DA"
                                        className="dark:fill-muted-foreground dark:stroke-muted"
                                        />
                                    ))
                                    }
                                </Geographies>
                                {visitors.map(({ country, count }) => {
                                    const coords = countryCoordinates[country];
                                    if (!coords) return null;
                                    return (
                                        <Marker key={country} coordinates={[coords.lon, coords.lat]}>
                                            <g
                                                fill="hsl(var(--primary))"
                                                stroke="hsl(var(--primary-foreground))"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                transform="translate(-12, -24)"
                                            >
                                                <circle cx="12" cy="10" r="3" />
                                                <path d="M12 21.7C17.3 17 20 13 20 10a8 8 0 1 0-16 0c0 3 2.7 6.9 8 11.7z" />
                                            </g>
                                            <text
                                                textAnchor="middle"
                                                y={-30}
                                                style={{ fontFamily: "system-ui", fill: "hsl(var(--foreground))", fontSize: "12px", fontWeight: "bold" }}
                                            >
                                                {`${country}: ${count}`}
                                            </text>
                                        </Marker>
                                    );
                                })}
                            </ComposableMap>
                        </div>
                        )}
                         <div className="flex flex-wrap gap-4 mt-4 justify-center">
                            {visitors.map(v => (
                                <div key={v.country} className="flex items-center gap-2">
                                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: "hsl(var(--primary))" }}></div>
                                    <span className="text-sm">{v.country}: <strong>{v.count}</strong></span>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </section>
    );
}