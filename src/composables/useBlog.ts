import { watch } from "vue"
import { useUser } from "../gun-vue/user/useUser"
const { user } = useUser()

const BLOG = {
  id: "1",
  title: "My Blog | 我的博客",
  content: `# title | 标题
## 小标题

paragraph 1 | 第一段

paragraph 2 with long text so it will display better | 第二段 长段落演示效果

paragraph 3 | 第三段
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