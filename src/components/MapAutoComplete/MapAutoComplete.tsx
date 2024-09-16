import React, { useState, useEffect, useRef } from "react";
import { IMapSearchedData } from "../../interfaces/mapSearchedData.interface";

interface IMapAutoComplete{
  setCity: (value:string)=> void;
  setDistrict: (value:string)=> void;
  setCommune: (value:string)=> void;
  setLongitude: (value:number)=> void;
  setLatitude: (value:number)=> void;
}

const MapAutoComplete = ({setCity, setDistrict, setCommune, setLongitude, setLatitude} : IMapAutoComplete) => {
  const [result, setResult] = useState<IMapSearchedData | null>(null);
  const geocoderRef = useRef<any>(null); // To store the geocoder instance

  useEffect(() => {
    // Load Goong JS and Goong Geocoder scripts and styles
    const goongJsScript = document.createElement("script");
    goongJsScript.src = "https://cdn.jsdelivr.net/npm/@goongmaps/goong-js@1.0.9/dist/goong-js.js";
    document.body.appendChild(goongJsScript);

    const goongGeocoderScript = document.createElement("script");
    goongGeocoderScript.src = "https://cdn.jsdelivr.net/npm/@goongmaps/goong-geocoder/dist/goong-geocoder.min.js";
    document.body.appendChild(goongGeocoderScript);

    const goongJsCSS = document.createElement("link");
    goongJsCSS.rel = "stylesheet";
    goongJsCSS.href = "https://cdn.jsdelivr.net/npm/@goongmaps/goong-js@1.0.9/dist/goong-js.css";
    document.head.appendChild(goongJsCSS);

    const goongGeocoderCSS = document.createElement("link");
    goongGeocoderCSS.rel = "stylesheet";
    goongGeocoderCSS.href = "https://cdn.jsdelivr.net/npm/@goongmaps/goong-geocoder/dist/goong-geocoder.css";
    document.head.appendChild(goongGeocoderCSS);

    const initGeocoder = () => {
      // Prevent reinitialization if the geocoder already exists
      if (!geocoderRef.current) {
        geocoderRef.current = new (window as any).GoongGeocoder({
          accessToken: 'XCULmFe7jiAYQHibkElloCmkxLUO0BmDAbBNpYcA',
        });
        geocoderRef.current.addTo("#geocoder");

        geocoderRef.current.on("result", (e: any) => {
          setResult(e.result);
        });

        geocoderRef.current.on("clear", () => {
          setResult(null);
        });
      }
    };

    // Wait for the Goong scripts to be loaded before initializing the geocoder
    goongGeocoderScript.onload = () => {
      initGeocoder();
    };

    return () => {
      // Clean up by removing the geocoder DOM element and scripts/styles when the component unmounts
      const geocoderElement = document.getElementById("geocoder");
      if (geocoderElement) {
        geocoderElement.innerHTML = ""; // Clear geocoder HTML content
      }
      document.body.removeChild(goongJsScript);
      document.body.removeChild(goongGeocoderScript);
      document.head.removeChild(goongJsCSS);
      document.head.removeChild(goongGeocoderCSS);
    };
  }, []);

  useEffect(()=>{
    
    
    if(result?.status === "OK"){
      setCity(result.result.compound.province);
      setCommune(result.result.compound.commune);
      setDistrict(result.result.compound.district);
      setLongitude(result.result.geometry.location.lng);
      setLatitude(result.result.geometry.location.lat);
    }
  }, [result, setCity, setCommune, setDistrict, setLatitude, setLongitude])

  return (
    <div>
      <div id="geocoder" className="h-fit w-full"/>
    </div>
  );
};

export default MapAutoComplete;
