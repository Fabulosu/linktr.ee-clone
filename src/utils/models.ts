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
    backgroundURL: String,
    activated: { type: Number, required: true },
    uuid: { type: String, required: true },
    name: String,
    settings: Array,
    biography: String,
    theme: { type: Number, required: true },
    icons_position: { type: Number, required: true },
}, { timestamps: true });

const linkSchema = new Schema({
    user: { type: String, required: true },
    title: reqString,
    url: reqString,
    order: { type: Number, required: true },
    enabled: Boolean,
    thumbnail: String,
    archived: Boolean,
}, { timestamps: true });

const headerSchema = new Schema({
    user: { type: String, required: true },
    title: reqString,
    enabled: Boolean,
    order: { type: Number, required: true },
}, { timestamps: true });

const iconSchema = new Schema({
    user: { type: String, required: true },
    url: reqString,
    enabled: Boolean,
}, { timestamps: true });

const UserModel = models.User || model("User", userSchema);
const LinkModel = models.Link || model("Link", linkSchema);
const HeaderModel = models.Header || model("Header", headerSchema);
const IconModel = models.Icon || model("Icon", iconSchema);

export { UserModel, LinkModel, HeaderModel, IconModel };