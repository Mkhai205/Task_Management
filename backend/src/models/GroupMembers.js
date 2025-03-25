import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';
import Users from './Users.js';
import Groups from './Groups.js';

const GroupMembers = sequelize.define('GroupMembers', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    group_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Groups,
            key: 'id'
        },
        onDelete: 'CASCADE' // Khi group bị xóa, tất cả thành viên trong group đó cũng bị xóa
    },
    user_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Users,
            key: 'id'
        },
        onDelete: 'CASCADE' // Khi user bị xóa, membership cũng bị xóa
    },
    role: {
        type: DataTypes.ENUM('admin', 'member'),
        defaultValue: 'member'
    },
    joined_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
}, {
    tableName: 'group_members',
    timestamps: false // Không sử dụng createdAt, updatedAt mặc định của Sequelize
});

// Thiết lập quan hệ
GroupMembers.belongsTo(Groups, { foreignKey: 'group_id', onDelete: 'CASCADE' });
GroupMembers.belongsTo(Users, { foreignKey: 'user_id', onDelete: 'CASCADE' });

export default GroupMembers;
