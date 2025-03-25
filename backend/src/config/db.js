// import pg from 'pg';
// import 'dotenv/config';


// const pool = new pg.Pool({
//     host: process.env.DB_HOST,
//     port: process.env.DB_PORT,
//     user: process.env.DB_USER,
//     password: process.env.DB_PASSWORD,
//     database: process.env.DB_NAME,
//     max: 20,
//     idleTimeoutMillis: 30000,
//     connectionTimeoutMillis: 2000,
// });

// export default pool;

import { Sequelize } from 'sequelize';
import 'dotenv/config';


const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'postgres',
    port: process.env.DB_PORT,
    logging: false, // Ẩn log SQL, có thể bật lại nếu cần debug
    pool: {
        max: 10,  // Số kết nối tối đa
        min: 0,  // Số kết nối tối thiểu
        acquire: 30000, // Thời gian tối đa để lấy kết nối (ms)
        idle: 10000 // Thời gian tối đa một kết nối có thể rảnh trước khi bị đóng (ms)
    },
    define: {
        freezeTableName: true, // Không tự động đổi tên bảng (vd: Users -> users)
        timestamps: false // Không tự động thêm createdAt, updatedAt
    }
});

// Kiểm tra kết nối
(async () => {
    try {
        await sequelize.authenticate();
        console.log('✅ Kết nối PostgreSQL thành công!');
    } catch (error) {
        console.error('❌ Lỗi kết nối database:', error.message);
    }
})();

export default sequelize;
