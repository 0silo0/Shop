import React, { useEffect, useState } from "react";
import './About.css';

const About = () => {
    const [map, setMap] = useState(null);
    const [marker, setMarker] = useState(null);
    const [currentCoords, setCurrentCoords] = useState({ lat: null, lng: null });

    useEffect(() => {
        const initialMap = new window.google.maps.Map(document.getElementById("map"), {
            center: { lat: 55.7558, lng: 37.6176 },
            zoom: 14,
        });

        const initialMarker = new window.google.maps.Marker({
            position: { lat: 55.7558, lng: 37.6176 },
            map: initialMap,
            title: "Наш адрес",
        });

        setMap(initialMap);
        setMarker(initialMarker);
    }, []);

    const getRandomCoords = () => {
        const lat = (Math.random() * 180 - 90).toFixed(6);
        const lng = (Math.random() * 360 - 180).toFixed(6); 
        return { lat: parseFloat(lat), lng: parseFloat(lng) };
    };

    const handleGenerateLocation = () => {
        const newCoords = getRandomCoords();
        if (map && marker) {
            map.setCenter(newCoords);
            marker.setPosition(newCoords);
            setCurrentCoords(newCoords);
        }
    };

    const handleShowMyLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const newCoords = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                    };
                    if (map && marker) {
                        map.setCenter(newCoords);
                        marker.setPosition(newCoords);
                        setCurrentCoords(newCoords);
                    }
                },
                (error) => {
                    console.error("Ошибка получения геолокации: ", error);
                    alert("Не удалось получить вашу геолокацию. Пожалуйста, проверьте настройки.");
                }
            );
        } else {
            alert("Geolocation не поддерживается вашим браузером.");
        }
    };

    return (
        <div className="about">
            <h1>Свяжитесь с нами</h1>
            <p>Мы поднимаем моду на новый уровень!</p>
            <ul>
                <li>Телефон: +7 (951) 955-53-17</li>
            </ul>
            <hr />
            <div id="map" className="map-container"></div>
            <button onClick={handleGenerateLocation} style={{ padding: "10px 20px", fontSize: "16px", marginTop: "20px" }}>
                Сгенерировать случайную геолокацию
            </button>
            <button 
                onClick={handleShowMyLocation} 
                style={{ padding: "10px 20px", fontSize: "16px", marginTop: "20px", marginLeft: "10px" }}>
                Показать мою геолокацию
            </button>
            <div style={{ marginTop: "20px", fontSize: "18px" }}>
                {currentCoords.lat !== null && currentCoords.lng !== null ? (
                    <p>Текущая геолокация: Широта: {currentCoords.lat}, Долгота: {currentCoords.lng}</p>
                ) : (
                    <p>Геолокация не сгенерирована.</p>
                )}
            </div>
        </div>
    );
}

export default About;
