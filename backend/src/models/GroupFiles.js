import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';
import Groups from './Groups.js';
import GroupMembers from './GroupMembers.js';

const GroupFiles = sequelize.define('GroupFiles', {
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
        allowNull: false,
        onDelete: 'CASCADE' // Xóa file nếu group bị xóa
    },
    uploaded_by: {
        type: DataTypes.INTEGER,
        references: {
            model: GroupMembers,
            key: 'id'
        },
        allowNull: true,
        onDelete: 'SET NULL' // Nếu user bị xóa, file vẫn tồn tại nhưng không có uploader
    },
    file_url: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
            isUrl: true // Đảm bảo giá trị là URL hợp lệ
        }
    },
    file_path: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
            isUrl: true // Đảm bảo giá trị là URL hợp lệ
        }
    },
    file_name: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    upload_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
}, {
    tableName: 'group_files',
    timestamps: false // Không dùng createdAt, updatedAt mặc định của Sequelize
});

// Thiết lập quan hệ
GroupFiles.belongsTo(Groups, { foreignKey: 'group_id', onDelete: 'CASCADE' });
GroupFiles.belongsTo(GroupMembers, { foreignKey: 'uploaded_by', onDelete: 'SET NULL' });

export default GroupFiles;
