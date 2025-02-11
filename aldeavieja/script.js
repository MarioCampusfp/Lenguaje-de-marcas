document.addEventListener("DOMContentLoaded", function() {
    fetch('https://www.el-tiempo.net/api/json/v2/provincias/28')
        .then(response => response.json())
        .then(data => {
            const weatherDiv = document.getElementById('weather');
            weatherDiv.innerHTML = `
                <p>Temperatura: ${data.temperatura_actual}°C</p>
                <p>Estado: ${data.estado_cielo}</p>
            `;
        })
        .catch(error => console.error('Error fetching weather data:', error));
});
