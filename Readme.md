# Meet in Middle

![Meet in Middle](https://your-image-url.com/banner.png) <!-- Replace with an actual banner image -->

## 🚀 Overview
**Meet in Middle** is a web application that helps users find optimal meeting locations based on participants' starting points. Using geolocation services, the platform suggests meeting spots that are **equidistant** for all participants, ensuring fair and convenient locations for meetups.

## ✨ Features
- 📍 **Geolocation-based Location Suggestions**
- 🗺️ **Interactive Map with Meeting Points**
- 🏪 **Venue Recommendations (Cafes, Parks, etc.)**
- 👥 **Multi-User Support**
- 🔒 **Secure Authentication**
- 📊 **Real-time Distance Calculation**

## 🛠️ Tech Stack
- **Backend:** Express.js with Node.js
- **Database:** MongoDB (Mongoose ODM)
- **Geolocation API:** Google Maps API / OpenStreetMap
- **Authentication:** JWT / OAuth

## 📦 Installation
### 1️⃣ Clone the Repository
```sh
git clone https://github.com/dev8093/Accio-Diaries---MITM.git
cd Accio-Diaries---MITM
```
### 2️⃣ Install Dependencies
```sh
npm install
```
### 3️⃣ Set Up Environment Variables
Create a `.env` file and configure the following:
```env
PORT=port
MONGODB_URI=mongodb-uri/db-name
CORS_ORIGIN=cors-origin
ACCESS_TOKEN_SECRATE=access-token-secrete
ACCESS_TOKEN_EXPIRY=1d
REFRESH_TOKEN_SECRATE=refresh-token-secrete
REFRESH_TOKEN_EXPIRY=10d

CLOUDINARY_CLOUD_NAME=cloudinary-cloud-name
CLOUDINARY_API_KEY=cloudinary-api-key
CLOUDINARY_API_SECRET=cloudinary-api-secrete
```

### 4️⃣ Start the Server
```sh
npm start
```
Server runs on **http://localhost:8000** by default.

## 📖 API Endpoints
### 🔹 **User Authentication**
- `POST /api/auth/register` ➝ Register a new user
- `POST /api/auth/login` ➝ Authenticate user & get token

### 🔹 **Meeting Locations**
- `POST /api/meetings/find` ➝ Calculate midpoint for given locations
- `GET /api/venues?lat={}&lng={}` ➝ Fetch nearby meeting places

## 💡 Future Enhancements
- 📍 **Route Optimization** using AI/ML
- 🤖 **Chatbot Integration** for meetup scheduling
- 🏆 **Gamification Features** for meetup tracking

## 🤝 Contributing
We welcome contributions! Please check our [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

## 📜 License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📨 Contact
📧 Email:   
🔗 GitHub: [@yourusername]()  

---
Made with ❤️ by **Meet in Middle Team**

