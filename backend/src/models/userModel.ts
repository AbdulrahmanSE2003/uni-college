import mongoose, { Document, Schema } from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
  isActive: boolean;
  role: "admin" | "teacher" | "student";
  lastSignIn: Date;
  passwordChangedAt: Date;
  createdAt: Date;
}

const userSchema: Schema<IUser> = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please tell us your name!"],
      trim: true,
      maxLength: [40, "User's name must be less than or equal 40 characters."],
    },

    email: {
      type: String,
      required: [true, "Please provide your email!"],
      unique: true,
      lowercase: true,
      trim: true,
      validate: [validator.isEmail, "Please provide a valid email!"],
    },

    password: {
      type: String,
      required: [true, "Please provide a password!"],
      minLength: [8, "Password must be at least 8 characters."],
      select: false,
    },

    passwordConfirm: {
      type: String,
      required: [true, "Please confirm your password!"],
      validate: {
        validator: function (this: any, el: string) {
          return el === this.password;
        },
        message: "Passwords are not the same!",
      },
    },

    role: {
      type: String,
      enum: ["admin", "teacher", "student"],
      required: true,
      default: "student",
    },
    isActive: { type: Boolean, default: true },
    lastSignIn: Date,
    passwordChangedAt: Date,
  },

  {
    timestamps: true,
  },
);

// ========================================================

// 3. Mongoose Middlewares (Pre-save Hook)

// ========================================================

userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;

  this.password = await bcrypt.hash(this.password, 12);

  this.passwordConfirm = undefined as any;
});

// ========================================================

// 4. Instance Methods

// ========================================================

userSchema.methods.matchPassword = async function (
  enteredPassword: string,
): Promise<boolean> {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model<IUser>("User", userSchema);

export default User;
