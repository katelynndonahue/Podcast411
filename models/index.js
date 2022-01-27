const User = require("./User");
const Playlist = require("./Playlist");
const Podcast = require("./Podcast");

User.hasMany(Playlist, {
	foreignKey: "user_id",
	onDelete: "CASCADE",
});

Playlist.belongsTo(User, {
	foreignKey: "user_id",
});

Playlist.hasMany(Podcast, {
	foreignKey: "playlist_id",
	onDelete: "CASCADE",
});

Podcast.belongsTo(Playlist, {
	foreignKey: "playlist_id",
});


module.exports = { User, Playlist, Podcast };
