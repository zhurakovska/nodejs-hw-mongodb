const sortOrderList = ["asc", "desc"]

export const parseSortParamsDecorator = (sortByList) => (req, res, next) => {
	const { sortOrder, sortBy } = req.query;
	const parsedSortOrder = sortOrderList.includes(sortOrder) ? sortOrder : "asc";
	const parsedSortBy = sortByList.includes(sortBy) ? sortBy : "_id";

	req.query = {
		...req.query,
		sortBy: parsedSortBy,
		sortOrder: parsedSortOrder
	};

	next();
};
