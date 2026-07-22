import { model, Schema } from "mongoose";

const studentSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    email: { type: String, required: true },
    age: { type: Number, required: true },
    studentId: { type: Number, required: true },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  },
);

export const studentModel = model("Student", studentSchema);
