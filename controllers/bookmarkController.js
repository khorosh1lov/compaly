const Bookmark = require('../models/Bookmark');

exports.getAllBookmarks = async (req, res, next) => {
	try {
		const bookmarks = await Bookmark.find({ user: req.user.id }).populate('company');
		res.json(bookmarks);
	} catch (err) {
		next(err);
	}
};

exports.createBookmark = async (req, res, next) => {
	try {
		const { company } = req.body;
		const bookmark = new Bookmark({
			user: req.user.id,
			company,
		});
		await bookmark.save();
		res.status(201).json(bookmark);
	} catch (err) {
		next(err);
	}
};

exports.deleteBookmark = async (req, res, next) => {
	try {
		let bookmark = await Bookmark.findById(req.params.id);
		if (!bookmark) {
			// TODO: Use httpError class
			return res.status(404).send({ error: 'Bookmark not found' });
		}
		await bookmark.deleteOne();
		res.status(200).json({ message: 'Bookmark deleted successfully' });
	} catch (err) {
		next(err);
	}
};
