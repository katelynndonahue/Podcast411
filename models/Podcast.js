const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Podcast extends Model {}

Podcast.init(
	{
		id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
		},
		title: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		listennotes_url:{
			type: DataTypes.STRING,
		},
		thumbnail :{
			type: DataTypes.STRING,
		},
		publisher:{
			type: DataTypes.STRING,
		},
		// url thumbnail publisher
		listennotes_id :{
			type: DataTypes.STRING
		},
		playlist_id: {
			type: DataTypes.INTEGER,
			references: {
				model: "user",
				key: "id",
			},
		},
	},
	{
		sequelize,
		timestamps: false,
		freezeTableName: true,
		underscored: true,
		modelName: "podcast",
	}
);

module.exports = Podcast;
