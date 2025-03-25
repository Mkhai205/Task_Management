import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Users = sequelize.define('Users', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true  // Kiểm tra định dạng email hợp lệ
        }
    },
    password: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    image_url: {
        type: DataTypes.TEXT,
        allowNull: true,
        validate: {
            isUrl: true // Đảm bảo giá trị là URL hợp lệ
        }
    },
    image_path: {
        type: DataTypes.TEXT,
        allowNull: true,
        validate: {
            isUrl: true // Đảm bảo giá trị là URL hợp lệ
        }
    },
    refresh_token: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    refresh_exprired: {
        type: DataTypes.DATE,
        allowNull: true
    },
    delete_at: {
        type: DataTypes.DATE,
        allowNull: true
    },
    create_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    last_login: {
        type: DataTypes.DATE,
        allowNull: true
    }
}, {
    tableName: 'users',
    timestamps: false  // Không cần `createdAt`, `updatedAt` vì đã có `create_at`
});

export default Users;
