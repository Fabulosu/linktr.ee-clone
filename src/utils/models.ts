import { Schema, model, models } from 'mongoose';

const reqString = {
    type: String,
    required: true
}

const userSchema = new Schema({
    username: reqString,
    password: reqString,
    email: reqString,
    avatarURL: String,
    activated: { type: Number, required: true },
    uuid: { type: String, required: true },
}, { timestamps: true });

const UserModel = models.User || model("User", userSchema);

export { UserModel };