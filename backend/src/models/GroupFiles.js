import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';
import Users from './Users.js';
import Groups from './Groups.js';

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
    uploader_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Users,
            key: 'id'
        },
        allowNull: true,
        onDelete: 'SET NULL' // Nếu user bị xóa, file vẫn tồn tại nhưng không có uploader
    },
    file_url: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    file_path: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
            isUrl: true // Đảm bảo giá trị là URL hợp lệ
        }
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
GroupFiles.belongsTo(Groups, { foreignKey: 'group_id', as: 'group', onDelete: 'CASCADE' });
GroupFiles.belongsTo(Users, { foreignKey: 'uploader_id', as: 'uploader', onDelete: 'SET NULL' });

export default GroupFiles;
