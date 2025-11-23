// backend/models/user.model.js
// Modelo User para HU-5 (registro / login)
// Referencia de requerimientos: /mnt/data/HU.txt

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, minlength: 2, maxlength: 50 },
  email: { type: String, required: true, unique: true, index: true, lowercase: true },
  password: { type: String, required: true, select: false }, // select:false evita devolver por defecto
  avatar: { type: String, default: '' },
  createdAt: { type: Date, default: Date.now }
}, { timestamps: true });

// Hash antes de guardar
UserSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Comparar password (instancia)
UserSchema.methods.comparePassword = async function(candidate) {
  return bcrypt.compare(candidate, this.password);
};

// Quitar password al convertir a JSON
UserSchema.methods.toJSON = function() {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

module.exports = mongoose.model('User', UserSchema);
