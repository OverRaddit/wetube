const fakeUser = {
	username: "Nicolas",
	loggedIn: true,
};
const videos = [
	{
	  title: "First Video",
	  rating: 5,
	  comments: 2,
	  createdAt: "2 minutes ago",
	  views: 4,
	  id: 1,
	},
	{
	  title: "Second Video",
	  rating: 5,
	  comments: 2,
	  createdAt: "2 minutes ago",
	  views: 59,
	  id: 2,
	},
	{
	  title: "Third Video",
	  rating: 5,
	  comments: 2,
	  createdAt: "2 minutes ago",
	  views: 59,
	  id: 3,
	},
  ];

export const trending = (req, res) => {
	return res.render("home", {pageTitle: "Home", fakeUser, videos});
}
export const watch = (req, res) => {
	const { id } = req.params;
	const video = videos[id - 1];
	//console.log(video);
	return res.render("watch", {pageTitle: `Watching ${video.title}`, video});
}
export const getedit = (req, res) => {
	const { id } = req.params;
	const video = videos[id - 1];
	return res.render("edit", {pageTitle: `Editing ${video.title}`, video});
}
export const postedit = (req, res) => {
	// const { id } = req.params;
	// const video = videos[id - 1];
	// return res.render("edit", {pageTitle: `Editing ${video.title}`, video});
}

export const search = (req, res) => res.send("Search");
export const upload = (req, res) => res.send("Upload");
export const deleteVideo = (req, res) => {
	return res.send("Delete Video");
};


