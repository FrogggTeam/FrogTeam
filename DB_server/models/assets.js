const Sequelize = require("sequelize");

module.exports = class Assets extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        no: {
          primaryKey: true,
          type: Sequelize.INTEGER,
          autoIncrement: true,
          allowNull: false,
        },
        email: {
          type: Sequelize.STRING(45),
          allowNull: false,
        },
        exchange: {
          type: Sequelize.STRING(45),
          allowNull: false,
        },
        coin: {
          allowNull: false,
          type: Sequelize.STRING(45),
        },
        amount: {
          type: Sequelize.INTEGER,
          allowNull: true,
        },
        price: {
          type: Sequelize.INTEGER,
          allowNull: true,
        },
      },
      {
        sequelize,
        timestamps: false,
        modelName: "Assets",
        tableName: "assets",
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci",
      }
    );
  }

  // 테이블간 관계 설정
  static associate(db) {
    db.Assets.belongsTo(db.Users, {
      foreignKey: "email",
      targetKey: "email",
    });
    db.Assets.belongsTo(db.ApiKeys, {
      foreignKey: "exchange",
      targetKey: "exchange",
    });
  }
};
