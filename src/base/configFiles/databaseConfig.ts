import mongoose from 'mongoose'

export async function connectDatabase() {
    const uri = 'mongodb://localhost/db'
    await mongoose.connect(process.env.MONGO_URI || uri)
}