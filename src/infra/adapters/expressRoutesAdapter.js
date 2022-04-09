const adaptRoute = controller => {
	return async (request, response) => {
		const httpResponse = await controller.handle(request);
		if (httpResponse.statusCode >= 200 && httpResponse.statusCode <= 299) {
			response.status(httpResponse.statusCode).json(httpResponse.body);
		} else {
			response.status(httpResponse.statusCode).json(httpResponse.message);
		}
	};
};

module.exports = adaptRoute;
