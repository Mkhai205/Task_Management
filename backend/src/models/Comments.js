import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';
import Tasks from './Tasks.js';
import Users from './Users.js';

const Comments = sequelize.define('Comments', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    task_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Tasks,
            key: 'id'
        },
        allowNull: false,
        onDelete: 'CASCADE' // Xóa comment nếu task bị xóa
    },
    user_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Users,
            key: 'id'
        },
        allowNull: false,
        onDelete: 'CASCADE' // Xóa comment nếu user bị xóa
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    create_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
}, {
    tableName: 'comments',
    timestamps: false // Không cần createdAt, updatedAt mặc định của Sequelize
});

// Thiết lập quan hệ
Comments.belongsTo(Tasks, { foreignKey: 'task_id', as: 'task', onDelete: 'CASCADE' });
Comments.belongsTo(Users, { foreignKey: 'user_id', as: 'user', onDelete: 'CASCADE' });

export default Comments;
