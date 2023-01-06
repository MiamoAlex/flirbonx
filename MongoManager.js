import mongoose, { mongo } from 'mongoose';
import crypto from 'crypto';

export class MongoManager {
    saveSchema = new mongoose.Schema({
        user: {
            id: String,
            username: String,
            password: String
        },

        tasks: [],

        friendsList: [Number]
    });

    Save = mongoose.model('Save', this.saveSchema);

    async generateDummyUser() {
        const save = Save({
            user: {
                id: crypto.randomUUID(),
                username: `MiamoAlex-${crypto.randomInt(512)}`,
                password: 'azd4za968e4f'
            },

            tasks: [{
                name: 'Miamo?',
                description: 'Super miamo task',
                type: 'quest'
            }],

            friendsList: [0, 1]
        });
        save.save();
    }

    async getUser(username) {
        const user = await this.Save.find({ 'user.username': username }).exec();
        return user;
    }

    async main() {
        mongoose.set('strictQuery', false);
        await mongoose.connect('mongodb://127.0.0.1:27017/flirbonx');
    }
}