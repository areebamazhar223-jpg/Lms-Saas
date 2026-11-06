import mongoose from "mongoose";

const captchaChallengeSchema = new mongoose.Schema({
  purpose: { type: String, enum: ["login", "register"], required: true },
  answerDigest: { type: String, required: true },
  expiresAt: { type: Date, required: true, index: { expires: 0 } },
}, { timestamps: true });

export default mongoose.model("CaptchaChallenge", captchaChallengeSchema);
