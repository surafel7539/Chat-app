import mongoose from 'mongoose'
import { ENV } from './env.js';

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(ENV.MONGO_DB)
        console.log('MONGODB connected succefully :', conn.connection.host)
    } catch (error) {
        console.error('Failed to connect to MONGODB', error);
        process.exit(1)
        
        
    }
}
export default connectDB;