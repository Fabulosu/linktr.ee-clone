import { Schema, model, models } from 'mongoose';

const reqString = {
    type: String,
    required: true
}

const themeSchema = new Schema({
    bgStyle: { type: Number, required: true },
    bgImage: { type: String, required: true },
    bgColor: { type: String, required: true },
    buttonStyle: { type: Number, required: true },
    buttonColor: { type: String, required: true },
    buttonHoverColor: { type: String, required: true },
    buttonFontColor: { type: String, required: true },
    buttonFontHoverColor: { type: String, required: true },
    buttonFont: { type: String, required: true },
});

const userSchema = new Schema({
    username: reqString,
    password: reqString,
    email: reqString,
    avatarURL: String,
    activated: { type: Number, required: true },
    uuid: { type: String, required: true },
    name: String,
    settings: Array,
    description: String,
    theme: { type: Number, required: true },
    icons_position: { type: Number, required: true },
    custom_theme: themeSchema,
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

const iconSchema = new Schema({
    user: { type: String, required: true },
    url: reqString,
    enabled: Boolean,
    order: { type: Number, required: true },
}, { timestamps: true });

const UserModel = models.User || model("User", userSchema);
const LinkModel = models.Link || model("Link", linkSchema);
const IconModel = models.Icon || model("Icon", iconSchema);

export { UserModel, LinkModel, IconModel };