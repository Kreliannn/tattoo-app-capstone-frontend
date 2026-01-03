import L from "leaflet";

export const mapIcon = (url : string) => {
    return L.divIcon({
        html: `
          <img 
            src="${url}"
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
}


export const convertToAmPm = (time: string) => {
    const [hour, minute] = time.split(":").map(Number)
    const isPM = hour >= 12
    const displayHour = hour % 12 || 12
  
    return `${displayHour}${minute ? `:${minute}` : ""} ${isPM ? "PM" : "AM"}`
  }
  

