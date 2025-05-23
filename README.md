
# 🧠 Diagram Generator

A web-based tool that generates diagrams from **text** or **code** using the **Gemini API** and displays them with **React Flow**. It supports **dark mode**, and users can **download** their generated diagrams as PNG images.

## 🚀 Features

- ✍️ Input text or code to auto-generate diagrams  
- 🧠 Backend AI (Gemini API) processes your input  
- 🗺️ Visual rendering with [React Flow](https://reactflow.dev/)  
- 🌙 Light/Dark mode toggle  
- 📥 Download diagrams as PNG images  

## 🛠️ Tech Stack

- **Frontend**: React, React Flow, html-to-image, downloadjs  
- **Backend**: Node.js, Express  
- **AI API**: Gemini by Google (via custom endpoint)

## 📦 Installation

### 1. Clone the repository
```bash
git clone https://github.com/Hasan-Shkoukani/diagram-generator.git
cd diagram-generator
```

### 2. Install dependencies
**Frontend**
```bash
cd client
npm install
```

**Backend**
```bash
cd ../server
npm install
```

## 🔧 Running the App

### Start the backend
```bash
cd server
npm start
```

### Start the frontend
```bash
cd ../client
npm start
```

Frontend runs on: `http://localhost:3000`  
Backend runs on: `http://localhost:5000`

## 🖼️ How It Works

1. You enter a prompt (either text or code).  
2. It’s sent to the backend (`/api/gemini/generate`).  
3. The Gemini API processes it and returns diagram structure.  
4. The frontend renders it using React Flow.  
5. You can download the result as a PNG image.

## 🌗 Dark Mode Support

Toggle light/dark themes using the ☀️/🌙 button in the corner.  
Different logos are used for each mode (`lightlogo.png`, `darklogo.png`).

## 📁 Project Structure

```
diagram-generator/
├── client/               # React frontend
│   ├── public/
│   ├── src/
│   │   ├── App.js
│   │   └── ...
│   └── ...
├── server/               # Express backend
│   ├── index.js
│   ├── routes/
│   └── ...
├── README.md
```

## ✍️ License

MIT License. Free to use and modify!

## 🤝 Contributions

Pull requests are welcome. For major changes, please open an issue first to discuss what you'd like to change.

## 📧 Contact

For questions or support, reach out at: hasanshkoukani19@gmail.com

## NOTE: This is a submission for the final project of SWE302 in Near East University
