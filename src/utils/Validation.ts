export function validateBookData(data: any) {
    const { title, author, publishedYear } = data;

    if (!title || !author || !publishedYear) {
        throw new Error("Title, author, and publishedYear are required.");
    }

    if (isNaN(publishedYear)) {
        throw new Error("Published year should be a valid number.");
    }
}


