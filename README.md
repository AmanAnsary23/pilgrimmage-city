# 🇮🇳 Pilgrimage City Itinerary Generator  
A full-stack web application that generates a real-time travel itinerary for pilgrimage cities like **Vrindavan / Mathura**.  
Users can select **pandits**, **temples**, and **food locations**, and the system instantly builds an itinerary, shows routes on **Google Maps**, and generates AI-based summaries.

---

## 🚀 Features
- 🕌 **Temple Selection** – Choose temples to include in the itinerary  
- 👳‍♂️ **Pandit Selection** – Select a pandit for assistance  
- 🍲 **Food/Lunch Spots** – Pick lunch places  
- 🗺️ **Live Google Maps Integration** – Shows markers + routes  
- 🤖 **AI-Generated Itinerary Summary** (Gemini API)  
- ⚡ Instant itinerary updates (React frontend + Django backend)  
- 📍 Directions using Google Maps `DirectionsRenderer`  

---

## 📂 Tech Stack
### **Frontend**
- React (Vite)
- @react-google-maps/api
- Axios  
- Tailwind (optional)

### **Backend**
- Django + Django REST Framework
- Python
- MySQL (or SQLite)

### **AI**
- Gemini API (Google Generative AI)

---

## 🛠️ Setup Instructions

## 📸 Screenshots

--Basic 
<img width="1374" height="832" alt="Screenshot 2025-11-27 145450" src="https://github.com/user-attachments/assets/268402d8-0034-42b3-b6a2-d878358947b1" />

--After Inserting all informations
<img width="1351" height="887" alt="Screenshot 2025-11-27 145520" src="https://github.com/user-attachments/assets/b4978efd-fedd-4443-96d4-5be0d61c2beb" />

**I User Chatgpt to generating the following database:
--20 pandit data
--20 temples data
--20 food places data

##Note 
Integrating street views , route and loaction asking for billing in google gemini api , so i just place map 
