const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: 'drq2a0262', 
  api_key: '688655248832415', 
  api_secret: 'r1GKf0eo3mkhVcvPZ8H4qAkKiZU' 
});

module.exports = cloudinary;
