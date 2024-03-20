import express from 'express';
import mongoose, { ConnectOptions } from 'mongoose';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes';
import blogRoutes from './routes/blogRoutes';
import messageRoutes from './routes/messageRoutes';
import userRoutes from './routes/userRoutes';
import likeRoutes from './routes/likeRoutes';
import commentRoutes from './routes/commentRoutes';
import imageRoutes from './routes/imageRoutes';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import cors from 'cors';

dotenv.config();

const app = express();
const PORT = process.env.PORT;

// Middleware
// app.use(cors());
// app.use(express.json());
app.use(bodyParser.json());
app.use(cors(
  {origin: 'http://127.0.0.1:5500',}
));
// Routes
app.use('/auth', authRoutes);
app.use('/blogs', blogRoutes);
app.use('/messages', messageRoutes);
app.use('/users', userRoutes);
app.use('/likes', likeRoutes);
app.use('/comments', commentRoutes);

// Serve static files from the "uploads" directory
app.use('/images', imageRoutes);

// Swagger setup
const swaggerOptions = {
    swaggerDefinition: {
      openapi: '3.0.0',
      info: {
        title: 'My API Documentation',
        version: '1.0.0',
        description: 'Documentation for My Brand Express API',
      },
      servers: [
        {
          url: `http://localhost:${PORT}`,
          description: '',
        },
        {
          url: `https://mybrand-api-backend.onrender.com`,
          description: 'deployed server',
        },
      ],
      components: {
        securitySchemes: {
          bearerAuth: {
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'JWT',
          },
        },
      },
      security: [{ bearerAuth: [] }],
    },
    
    apis: ['./src/routes/*.ts'], // Path to the files containing your route definitions
  };
  
  // Swagger setup
  const swaggerSpec = swaggerJsdoc(swaggerOptions);
  app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Connect to MongoDB
const mongoURI = process.env.MONGODB_URI;
if (!mongoURI) {
    console.error('MongoDB URI is not defined');
    process.exit(1); // Exit the process with an error code
}

const options: any = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    
};

mongoose.connect(mongoURI, options)
.then(() => {
    console.log('Connected to MongoDB');

      //  Start the server
      const PORT = 5000;
      app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
      });
});
