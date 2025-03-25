import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';
import GroupMembers from './GroupMembers.js';
import Users from './Users.js';

const Tasks = sequelize.define('Tasks', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    created_by: {
        type: DataTypes.INTEGER,
        references: {
            model: GroupMembers,
            key: 'id'
        },
        onDelete: 'CASCADE' // Khi user bị xóa, task do họ tạo cũng bị xóa
    },
    title: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    status: {
        type: DataTypes.ENUM('pending', 'in-progress', 'completed'),
        defaultValue: 'pending'
    },
    assigned_to: {
        type: DataTypes.INTEGER,
        references: {
            model: Users,
            key: 'id'
        },
        onDelete: 'SET NULL' // Nếu user bị xóa, nhiệm vụ vẫn tồn tại nhưng không có người được giao
    },
    create_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    due_date: {
        type: DataTypes.DATE,
        allowNull: true
    }
}, {
    tableName: 'tasks',
    timestamps: false // Không dùng createdAt, updatedAt mặc định của Sequelize
});

// Thiết lập quan hệ
Tasks.belongsTo(GroupMembers, { foreignKey: 'created_by', onDelete: 'CASCADE' });
Tasks.belongsTo(Users, { foreignKey: 'assigned_to', onDelete: 'SET NULL' });

export default Tasks;
