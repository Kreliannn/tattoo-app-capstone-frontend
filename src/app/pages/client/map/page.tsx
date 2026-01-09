'use client';
import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useQuery } from "@tanstack/react-query";
import { artistInfoInterface } from "@/app/types/accounts.type";
import { mapIcon } from "@/app/utils/customFunction";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import axiosInstance from "@/app/utils/axios";


const App: React.FC = () => {
 
    const defaultPosition: L.LatLngExpression = [14.315885007395133, 120.94680688824083]; 

 


  const { data: artistInfo, isLoading } = useQuery({
    queryKey: ['map_info'],
    queryFn: async (): Promise<artistInfoInterface[]> => {
      const response = await axiosInstance.get(`/account/artistInfo`);
      return response.data;
    }
  });



  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <MapContainer center={defaultPosition} zoom={13} style={{ height: "100%", width: "100%" }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {
            artistInfo?.map((artist) => {

                if(!artist.artist.location) return null
                
                return(
                    <Marker key={artist._id} position={[artist.artist.location.lat, artist.artist.location.long]}  icon={mapIcon(artist.artist.profile)}>
                        <Popup>
                            <div className=" p-3 flex flex-col items-center text-center gap-2">
                                
                                       {/* Action */}
                                <Link href={`/pages/client/artistProfile/${artist.artist._id}`} >
                                    <img
                                    src={artist.artist.profile}
                                    alt={artist.artist.name}
                                    className="w-16 h-16 rounded-full object-cover border hover:scale-105"
                                    />
                                </Link>
                            

                                {/* Artist Info */}
                                <div className="space-y-1">
                                <h1 className="text-base font-semibold">
                                    {artist.artist.name}
                                </h1>

                           
                                </div>

                         

                            </div>
                        </Popup>

                    </Marker>
                )
            
            })
                
        }
      
      </MapContainer>
    </div>
  );
};

export default App; 
