import mongoose from "mongoose";

/* Conecta a la base de datos */
const connectDB = async (): Promise<void> => {
    const mongoUri = process.env.MONGO_URI as string;
    try {
        await mongoose
        .connect(mongoUri)
        .then(() => {
            console.log("MongoDB Atlas connected!");
        });
    } catch (error) {
        console.error(`Error: ${error}`);
        process.exit(1);
    }
};

export default connectDB;
