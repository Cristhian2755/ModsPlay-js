import mongoose from "mongoose";

export const connectMongo = async () => {
    try {
        if (!process.env.MONGO_URI) {
        throw new Error("MONGO_URI no está definida en el archivo .env");
        }

        // Opciones recomendadas para compatibilidad y estabilidad
        const options = {
            
            useNewUrlParser: true,
            useUnifiedTopology: true,
            maxPoolSize: 10, // evita saturación de conexiones
        };

        await mongoose.connect(process.env.MONGO_URI, options);

        console.log("Conexión exitosa a MongoDB Atlas");

        // Evento útil si la conexión se cae en caliente
        mongoose.connection.on("disconnected", () => {
            console.warn("Conexión a MongoDB perdida. Intentando reconectar...");
        });

    } catch (error) {
        console.error("Error al conectar a MongoDB:", error.message);
        process.exit(1); // opcional: detiene la app si la conexión falla
    }
};


