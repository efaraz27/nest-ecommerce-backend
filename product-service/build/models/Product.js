"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const productSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3,
        maxlength: 50,
    },
    price: {
        type: Number,
        required: true,
        min: 0,
    },
    description: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 500,
    },
    image: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 500,
    },
    category: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50,
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        required: true,
        default: Date.now,
    },
}, { timestamps: true });
const Product = (0, mongoose_1.model)("Product", productSchema);
exports.default = Product;
