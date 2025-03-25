import sequelize from "../config/db.js";
import Users from "./Users.js";
import Groups from "./Groups.js";
import GroupMembers from "./GroupMembers.js";
import Tasks from "./Tasks.js";
import GroupFiles from "./GroupFiles.js";
import CheckLists from "./CheckLists.js";
import Comments from "./Comments.js";


const syncDB = async () => {
    try {
        await sequelize.sync({ alter: true }); // { force: true } để xóa bảng cũ
        console.log("✅ Database synchronized!");
    } catch (error) {
        console.error("❌ Error synchronizing database:", error.message);
    }
};

export {
    syncDB, Users, Groups,
    GroupMembers, Tasks, GroupFiles,
    CheckLists, Comments
};

