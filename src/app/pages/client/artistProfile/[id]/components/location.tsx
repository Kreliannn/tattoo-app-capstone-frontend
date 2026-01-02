"use client"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { artistInfoInterface } from "@/app/types/accounts.type";
import { useMutation } from "@tanstack/react-query";
import axiosInstance from "@/app/utils/axios";
import { successAlert, errorAlert } from "@/app/utils/alert";


interface ClickableMapProps {
    artistInfo : artistInfoInterface,
    setArtistInfo : (data : artistInfoInterface) => void
}






  
const MapLocation: React.FC<ClickableMapProps>  = ({ artistInfo, setArtistInfo }) => {

  const location = artistInfo.location


  const customIcon = L.divIcon({
    html: `
      <img 
        src="${artistInfo.artist.profile}"
        style="
          width:32px;
          height:32px;
          border-radius:50%;
          object-fit:cover;
        "
      />
    `,
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
    className: ""
  });
  

  const [mapLocation, setMapLocation] = useState<{ lat: number, long: number } | null>(location)

  const [open, setOpen] = useState(false);



  const defaultPosition: L.LatLngExpression = [14.315885007395133, 120.94680688824083]; 




    
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {!open && (
            <div className="w-full h-full rounded" onClick={() => setOpen(true)}> 
              <MapContainer 
              center={location ? [location.lat, location.long] : defaultPosition } 
              zoom={13} 
              style={{ height: '100%', width: '100%' }} 
              dragging={false}
              scrollWheelZoom={false}
              doubleClickZoom={false}
              zoomControl={false}
              touchZoom={false}
              keyboard={false}
              >
                  <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                
                  {location && (
                      <Marker position={[location.lat, location.long]} icon={customIcon}>
              
                      </Marker>
                  )}
              </MapContainer>
            </div>
        )}
      </DialogTrigger>
      <DialogHeader>
          <DialogTitle>     </DialogTitle>
          <DialogDescription>   
           
          </DialogDescription>
        </DialogHeader>
      <DialogContent className="sm:max-w-[825px] h-[600px]">

    
        <div className=" gap-6 w-full h-[500px] mt-10">
         
        <MapContainer center={defaultPosition} zoom={13} style={{ height: '100%', width: '100%' }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      
        {mapLocation && (
            <Marker position={[mapLocation.lat, mapLocation.long]} icon={customIcon}>
         
            </Marker>
        )}
        </MapContainer>

   
       
        </div>

      
      </DialogContent>
    </Dialog>
  )
}


export default MapLocation;