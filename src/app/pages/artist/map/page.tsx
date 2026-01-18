'use client';
import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useQuery } from "@tanstack/react-query";
import { artistInfoInterface } from "@/app/types/accounts.type";
import { bussinessInfoInterface } from "@/app/types/accounts.type";
import { mapIcon } from "@/app/utils/customFunction";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import axiosInstance from "@/app/utils/axios";




const App: React.FC = () => {
 
  const defaultPosition: L.LatLngExpression = [14.315885007395133, 120.94680688824083]; 

 



  const { data: bussinessInfo } = useQuery({
    queryKey: ['map_info_bussiness'],
    queryFn: async (): Promise<bussinessInfoInterface[]> => {
      const response = await axiosInstance.get(`/account/bussinessInfo`);
      return response.data;
    }
  });

  console.log(bussinessInfo)



  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <MapContainer center={defaultPosition} zoom={13} style={{ height: "100%", width: "100%" }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      
        {
            bussinessInfo?.map((bussiness) => {

                if(!bussiness.bussiness.location) return null
                
                return(
                    <Marker key={bussiness._id} position={[bussiness.bussiness.location.lat!, bussiness.bussiness.location.long!]}  icon={mapIcon("/shop-logo.jpg")}>
                        <Popup>
                            <div className=" p-3 flex flex-col items-center text-center gap-2">
                                
                                       {/* Action */}
                                <Link href={`/pages/artist/bussinessProfile/${bussiness.bussiness._id}`} className="w-16 h-16">
                                    <img
                                    src={bussiness.bussiness.profile}
                                    alt={bussiness.bussiness.name}
                                    className="w-16 h-16 rounded-full object-cover border hover:scale-105"
                                    />
                                </Link>
                            

                                {/* bussiness Info */}
                                <div className="space-y-1">
                                <h1 className="text-base font-semibold">
                                    {bussiness.bussiness.name}
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
