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
    title: reqString,
    url: reqString,
    enabled: Boolean,
    thumbnail: String,
    settings: Array,
    archived: Boolean,
}, { timestamps: true });

const headerSchema = new Schema({
    title: reqString,
    enabled: Boolean,
}, { timestamps: true });

const iconSchema = new Schema({
    url: reqString,
    enabled: Boolean,
}, { timestamps: true });

const UserModel = models.User || model("User", userSchema);
const LinkModel = models.Link || model("Link", linkSchema);
const HeaderModel = models.Header || model("Header", headerSchema);
const IconModel = models.Icon || model("Icon", iconSchema);

export { UserModel, LinkModel, HeaderModel, IconModel };