import { model, Schema } from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new Schema(
  {
    role: {
      type: String,
      required: [true, "role is required"],
    },
    email: { type: String, required: true },
    password: { type: String, required: true },
  },
  {
    timestamps: true,
  },
);

userSchema.pre("save", async function () {
  const user = this;
  user.password = await bcrypt.hash(
    user.password,
    Number(process.env.BCRYPT_SOLD_ROUND),
  );
});

export const userModel = model("User", userSchema);
