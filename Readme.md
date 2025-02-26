# Meet in Middle

![Meet in Middle](https://your-image-url.com/banner.png) <!-- Replace with an actual banner image -->

## 🚀 Overview
**Meet in Middle** is a web application that helps users find optimal meeting locations based on participants' starting points. Using geolocation services, the platform suggests meeting spots that are **equidistant** for all participants, ensuring fair and convenient locations for meetups.

## ✨ Features
- 📍 **Geolocation-based Location Suggestions**
- 🗺️ **Interactive Map with Meeting Points**
- 🏪 **Venue Recommendations (Cafes, Parks, etc.)**
- 👥 **Multi-User Support**
- 🔒 **Secure Authentication (JWT/OAuth)**
- 📊 **Real-time Distance Calculation**
- 📡 **Cloud-Based Image Storage (Cloudinary)**

## 🛠️ Tech Stack
- **Frontend:** React.js (Future enhancement)
- **Backend:** Express.js with Node.js
- **Database:** MongoDB (Mongoose ODM)
- **Geolocation API:** Google Maps API / OpenStreetMap
- **Authentication:** JWT / OAuth
- **Hosting:** Vercel / Heroku

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
PORT=8000
MONGODB_URI=your-mongodb-uri
CORS_ORIGIN=your-cors-origin
ACCESS_TOKEN_SECRET=your-access-token-secret
ACCESS_TOKEN_EXPIRY=1d
REFRESH_TOKEN_SECRET=your-refresh-token-secret
REFRESH_TOKEN_EXPIRY=10d

CLOUDINARY_CLOUD_NAME=your-cloudinary-cloud-name
CLOUDINARY_API_KEY=your-cloudinary-api-key
CLOUDINARY_API_SECRET=your-cloudinary-api-secret
```

### 4️⃣ Start the Server
```sh
npm start
```
Server runs on **http://localhost:8000** by default.

## 📖 API Endpoints
### 🔹 **User Authentication** (`/api/auth`)
- `GET /google` ➝ Authenticate with Google OAuth
- `GET /google/callback` ➝ Google authentication callback

### 🔹 **User Management** (`/api/user`)
- `POST /register` ➝ **Body:** `{ name, email, password }` ➝ Register a new user
- `POST /login` ➝ **Body:** `{ email, password }` ➝ Authenticate user & get token
- `PATCH /refresh-access-token` ➝ **Body/Cookies:** `{ refreshToken }` ➝ Refresh access token
- `DELETE /logout` ➝ Clears authentication tokens and logs out the user
- `GET /verify-email` ➝ **Query:** `?token={token}` ➝ Verify user's email
- `GET /check-auth` ➝ Checks if user is authenticated
- `PATCH /update-profile` ➝ **FormData:** `{ avatar }` ➝ Update user's profile picture

### 🔹 **Meeting Locations** (`/api/meetings`)
- `POST /find` ➝ **Body:** `{ locations: [{ lat, lng }, { lat, lng }] }` ➝ Calculate midpoint for given locations
- `GET /venues` ➝ **Query:** `?lat={latitude}&lng={longitude}` ➝ Fetch nearby meeting places

## 💡 Future Enhancements
- 📍 **Route Optimization** using AI/ML
- 🤖 **Chatbot Integration** for meetup scheduling
- 📆 **Calendar Integration** for event scheduling
- 🏆 **Gamification Features** for meetup tracking
- 🌍 **Multi-Language Support**
- 📱 **Mobile App Version**

## 🤝 Contributing
We welcome contributions! Please check our [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

## 📜 License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📨 Contact
📧 Email: [your-email@example.com](mailto:your-email@example.com)  
🔗 GitHub: [@yourusername](https://github.com/yourusername)

---
Made with ❤️ by **Meet in Middle Team**

