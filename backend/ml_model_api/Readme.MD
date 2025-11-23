🌾 Smart Crop Health & Soil Monitoring System (SIH 2025)

An AI-powered smart agriculture system built for Smart India Hackathon 2025, designed to analyze crop health using machine learning, monitor soil conditions in real time using IoT sensors, and provide farmers with actionable insights for better yield and reduced crop losses.


🚀 Features
🔍 1. Crop Health Detection (ML Model)

Accepts crop images and classifies:

Pest infection

Disease presence

Healthy / unhealthy crop condition

Trained using a custom dataset with high accuracy.

Model integrated into the backend for instant results.

🌱 2. Soil Moisture Monitoring (ESP32 + Sensors)

Uses ESP32 microcontroller with:

Soil moisture sensor

Arduino-compatible setup

Reads real-time soil moisture values.

Sends data to the backend/cloud dashboard.

🧪 3. Soil Nutrient Detection (Upcoming Feature)

Planned integration:

NPK (Nitrogen, Phosphorus, Potassium) sensors

Nutrient-level analysis for better crop planning.

☁️ 4. Weather API Integration

Fetches real-time weather data:

Temperature

Humidity

Rain probability

Future weather forecasts

Helps farmers make better irrigation/pesticide decisions.

📊 5. Dashboard / App Support

Displays:

Crop health predictions

Soil moisture content (live)

Weather conditions

Recommendations

Clean and intuitive UI.


🛠️ Tech Stack
Machine Learning

Python, TensorFlow / PyTorch

Image classification model


IoT Hardware

ESP32 microcontroller

Soil Moisture Sensor

Arduino-compatible wiring

Wi-Fi data transmission

Backend

Node.js / Express (or your backend choice)

REST API for ESP32 + ML model integration

Frontend

React / HTML + JS

Visual dashboard for farmers

APIs

OpenWeather / WeatherAPI

Custom ML API



🧩 System Architecture

User uploads crop image

ML model predicts crop condition

ESP32 reads soil moisture → sends data to server

Weather API fetches local weather details

Backend processes and combines all data

Dashboard shows all results + recommendations


📸 Project Demo

https://youtu.be/qkiMok3EBoU





🧠 Future Enhancements

Soil nutrient (NPK) detection

Automated irrigation using relays

Mobile app (Flutter / React Native)

Text/SMS alerts for farmers

Drone-based crop scanning



