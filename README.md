# FileFlow-API

## 📌 Overview
**FileFlow-API** is an API-based **Document Management System** that allows users to:
- ✅ Create folders with specific restrictions (file type & max file limit)
- ✅ Upload files with metadata using **Multer**
- ✅ Authenticate users with **JWT** before uploading
- ✅ Store image files in **Cloudinary**
- ✅ Save file details in **Supabase**
- ✅ Perform operations like **CRUD**, **sorting**, and **filtering** on folders & files

## 🛠 Tech Stack
- **Backend:** Node.js, Express.js
- **Authentication:** JSON Web Tokens (JWT)
- **File Upload:** Multer
- **Cloud Storage:** Cloudinary
- **Database:** Supabase (PostgreSQL)

## 🔐 Authentication
Before uploading a file, JWT authentication is integrated to ensure secure access.

## 🚀 Installation & Setup

### 1️⃣ Clone the Repository
```sh
git clone https://github.com/Tripathygithub/FileFlow-API.git
cd FileFlow-API
```

### 2️⃣ Install Dependencies
```sh
npm install
```

### 3️⃣ Set Up Environment Variables
Create a **.env** file and configure:
```env
PORT=5000
JWT_SECRET=your_secret_key
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
SUPABASE_URL=your_supabase_url
SUPABASE_KEY=your_supabase_key
```

### 4️⃣ Start the Server
```sh
npm start
```

## 📌 API Endpoints

### 📁 Folder Management
| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/folder/create` | Create a new folder |
| `PUT` | `/folder/:folderId` | Update a folder by ID |
| `DELETE` | `/folder/:folderId` | Delete a folder by ID |
| `GET` | `/folders` | Get all folders |

### 📂 File Management
| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/folders/:folderId/files` | Upload a file to a folder (with JWT & multer) |
| `DELETE` | `/folders/:folderId/files/:fileId` | Delete a specific file |
| `GET` | `/folders/:folderId/files` | Get all files in a folder |
| `GET` | `/folders/:folderId/files-by-sort` | Get sorted files in a folder |
| `GET` | `/files` | Get specific file types |

## 📦 File Upload Process
1. **Authenticate** via JWT.
2. **Check folder restrictions** (file type & max limit).
3. **Upload files using Multer**.
4. **Store images in Cloudinary**.
5. **Save metadata in Supabase**.

## 🚀 Future Enhancements
- [ ] Implement user roles & permissions
- [ ] Add support for file versioning
- [ ] Enhance search & filtering features


