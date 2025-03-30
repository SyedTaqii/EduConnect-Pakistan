const express = require("express");
const router = express.Router();
const seed_controller = require("../../controllers/seed_controller");

console.log('Seeding data...');
router.post("/", seed_controller.seedData);
console.log('Seeding data...');

module.exports = router;
