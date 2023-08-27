"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateBookData = void 0;
function validateBookData(data) {
    const { title, author, publishedYear } = data;
    if (!title || !author || !publishedYear) {
        throw new Error("Title, author, and publishedYear are required.");
    }
    if (isNaN(publishedYear)) {
        throw new Error("Published year should be a valid number.");
    }
}
exports.validateBookData = validateBookData;
