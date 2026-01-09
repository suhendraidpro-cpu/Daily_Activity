
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBe8dlow52Y7aSBxDTOwyo3nS5ZMg0gzJ8",
  authDomain: "fandashboard.firebaseapp.com",
  projectId: "fandashboard",
  storageBucket: "fandashboard.firebasestorage.app",
  messagingSenderId: "8318759415",
  appId: "1:8318759415:web:dc8c427606488a8b16bef2",
  measurementId: "G-HHCQEMEXF4"
};

console.log("🔧 Initializing Firebase...");
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
console.log("✓ Firebase initialized successfully");

document.getElementById('inputForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    console.log("📝 Form submitted");
    
    const companyName = document.getElementById('companyName')?.value || "";
    const applicantName = document.getElementById('applicantName')?.value || "";
    const position = document.getElementById('position')?.value || "";
    const projectName = document.getElementById('projectName')?.value || "";
    const submissionDate = document.getElementById('submissionDate')?.value || "";
    const status = document.getElementById('statusInput')?.value || "";
    const applicationName = document.getElementById('applicationName')?.value || "";
    const type = document.getElementById('type')?.value || "";
    const quantity = document.getElementById('quantity')?.value || "";
    const duration = document.getElementById('duration')?.value || "";
    const purpose = document.getElementById('purpose')?.value || "";
    const description = document.getElementById('description')?.value || "";
    const clientName = document.getElementById('clientName')?.value || "";

    const data = {
        companyName,
        applicantName,
        position,
        projectName,
        submissionDate,
        status,
        applicationName,
        type,
        quantity,
        duration,
        purpose,
        description,
        documentNumber: "",
        pmName: "",
        clientName,
        timestamp: new Date().toISOString()
    };

    console.log("📦 Data to send:", data);
    
    const statusMessage = document.getElementById('messageStatus');
    if (statusMessage) {
        statusMessage.textContent = '⏳ Mengirim data...';
        statusMessage.className = 'loading';
    }
    
    try {
        console.log("🚀 Sending to Firestore collection: 'licenses'");
        const docRef = await addDoc(collection(db, "licenses"), data);
        console.log("✅ Document added with ID:", docRef.id);
        
        if (statusMessage) {
            statusMessage.textContent = '✓ Data berhasil dikirim! (ID: ' + docRef.id + ')';
            statusMessage.className = 'success';
        }
        document.getElementById('inputForm').reset();
        setTimeout(() => {
            if (statusMessage) {
                statusMessage.textContent = '';
                statusMessage.className = '';
            }
        }, 4000);
    } catch (error) {
        console.error("❌ Error:", error);
        console.error("Error code:", error.code);
        console.error("Error message:", error.message);
        
        let errorMsg = 'Gagal mengirim data.';
        if (error.code === 'permission-denied') {
            errorMsg = '❌ Permission denied. Periksa Firestore Rules!';
        } else if (error.code === 'unauthenticated') {
            errorMsg = '❌ Tidak terautentikasi. Firestore Rules harus mengizinkan akses publik.';
        } else if (error.message) {
            errorMsg = '❌ Error: ' + error.message;
        }
        
        if (statusMessage) {
            statusMessage.textContent = errorMsg;
            statusMessage.className = 'error';
        }
    }
});
