import { watch } from "vue"
import { useUser } from "../gun-vue/user/useUser"
const { user } = useUser()

const BLOG = {
  id: "1",
  title: "My Blog | 我的博客",
  content: `
# title | 标题
## subtitle | 小标题

### paragraph | 段落
paragraph 1 | 第一段

paragraph 2 with long text so it will display better | 第二段 长段落演示效果

paragraph 3 | 第三段
 
### list | 列表
- list 1
- list 2
- list 3

### code | 代码
\`\`\`js
const num = 100
console.log("hello world", num)
\`\`\`

### table | 表格   
|col1|col2|col3|
|-----|----|-----|
| l1c1 | l1c2 | l1c3 |
| l2c1 | l2c2 | l2c3 |
| l3c1 | l3c2 | l3c3 |
`,
  author: "Moi",
  date: "2022-02-22"
  }
export const blogs = ref([ BLOG ])

watch(user, () => {
  if (!user.initiated) {
    console.log(`use blog: user not auth or switch user`)
    blogs.value = [BLOG]
  }
  //else {
  //  // console.log(`use blog: user logged in but updates`)
  //  // blogs.value.unshift(Object.assign({}, BLOG, {id: `${Math.ceil(Math.random() * 10000)}`}))
  //}
})