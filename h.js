import React, { useState, useRef } from 'react';
import Webcam from 'react-webcam';
import * as faceapi from 'face-api.js';

function Login() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const webcamRef = useRef(null);

    const handleLogin = async () => {
        const imageSrc = webcamRef.current.getScreenshot();
        const image = await faceapi.fetchImage(imageSrc);

        // Load the pre-stored image of the user's face
        const userImage = await faceapi.fetchImage('/path/to/user/image.jpg');

        // Detect the faces in the images
        const detections = await faceapi.detectAllFaces(image);
        const userDetections = await faceapi.detectAllFaces(userImage);

        // Compare the detected faces to the pre-stored image
        const faceMatcher = new faceapi.FaceMatcher(userDetections);
        const bestMatch = faceMatcher.findBestMatch(detections);

        // If the detected face matches the stored image, grant access
        if (bestMatch.label === 'user') {
            setIsAuthenticated(true);
        } else {
            alert('Face detection failed. Please try again.');
        }
    };

    return (
        <div>
            {isAuthenticated ? (
                <p>Welcome, user!</p>
            ) : (
                <>
                    <Webcam ref={webcamRef} />
                    <button onClick={handleLogin}>Login with Face Detection</button>
                </>
            )}
        </div>
    );
}

export default Login;