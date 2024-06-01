import {v } from 'convex/values';
import {defineSchema , defineTable} from 'convex/server';

export default defineSchema({
    boards : defineTable({
        title : v.string(),
        orgId : v.string(),
        authorID : v.string(),
        authorName : v.string(),
        imageUrl  :v.string(),
    })
    .index("by_org", ['orgId'])
    .searchIndex("search_title" , {
        searchField : "title",
        filterFields : ["orgId"]
    }),

    userFavorites : defineTable({
        orgId : v.string(),
        userId : v.string(),
        boardId : v.id("boards")
    })
    .index("by_board", ["boardId"])
    .index("by_user_org", ["orgId","userId"])
    .index("by_user_board", ["userId","boardId"])
    .index("by_user_org_board", ["userId","orgId","boardId"])
});