import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';
import Tasks from './Tasks.js';

const CheckLists = sequelize.define('Checklists', {
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
        onDelete: 'CASCADE' // Xóa checklist nếu task bị xóa
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    is_completed: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    create_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
}, {
    tableName: 'checklists',
    timestamps: false // Không cần createdAt, updatedAt mặc định của Sequelize
});

// Thiết lập quan hệ
CheckLists.belongsTo(Tasks, { foreignKey: 'task_id', onDelete: 'CASCADE' });

export default CheckLists;
