/**
 * Request handler for GET /materials. Handles request for retrieving materials resource
 * @param {Request} request request object passed in from express server
 * @param {Response} response response object passed in from express server
 */
export const handleGetMaterials = (request, response) => {
    response.send("This is a test");
};
