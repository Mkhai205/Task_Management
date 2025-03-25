import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';
import Users from './Users.js';

const Groups = sequelize.define('Groups', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    owner_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Users,
            key: 'id'
        },
        onDelete: 'CASCADE' // Nếu user bị xóa thì group cũng bị xóa
    },
    create_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
}, {
    tableName: 'groups',
    timestamps: false // Không sử dụng createdAt, updatedAt mặc định của Sequelize
});

// Thiết lập quan hệ với User
Groups.belongsTo(Users, { foreignKey: 'owner_id', onDelete: 'CASCADE' });

export default Groups;
