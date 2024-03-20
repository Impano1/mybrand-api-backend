
import express from 'express';
import path from 'path';
import fs from 'fs'; // Import the 'fs' module for file system operations

const router = express.Router();

// Define the path to the uploads directory
const uploadsPath = ('./uploads');

// Define a route for handling GET requests to the root URL '/'
router.get('/', (req, res) => {
    res.send('Welcome to the uploads API'); // Respond with a simple message
});
// Define a route for handling GET requests to '/uploads'

router.get('/uploads', (req, res) => {
    // Read the contents of the uploads directory asynchronously
    fs.readdir(uploadsPath, (err, files) => {
        if (err) {
            console.error('Error reading uploaded files:', err);
            res.status(500).send('Internal server error'); // Respond with 500 status on error
            return;
        }
        res.json({ image: files }); // Respond with a JSON object containing the list of files
    });
});

// Route to get a single image
router.get('/uploads/:imageName', (req, res) => {
    const imageName = req.params.imageName;
    const imagePath = path.resolve(path.join(uploadsPath, imageName)); 
    
    // Check if the image exists
    fs.access(imagePath, fs.constants.F_OK, (err) => {
        if (err) {
            console.error('Error accessing image file:', err);
            res.status(404).send('Image not found');
            return;
        }
        // If the image exists, send it as a response
        res.sendFile(imagePath);
    });
});

export default router;
