/**
 * @module Projects
 */

import { computed, reactive, ref } from "vue"
import { projectsPath, project } from "."
import { useGun } from "../gun"
import { currentRoom } from "../room"
import Fuse from "fuse.js";



export function useProjects() {

  const search = ref('')
  const projects = reactive({})

  const fuse = computed(() => {
    const list = Object.entries(projects).map(arr => ({ ...arr[1], path: arr[0] }))
    return new Fuse(list, {
      includeScore: true,
      ignoreLocation: true,
      keys: ["title"],
    })
  })

  const candidates = computed(() => {
    if (project.title) {
      return fuse.value.search(project.title)
    } else {
      return Object.entries(projects).map(arr => ({ item: { ...arr[1], path: arr[0] } }))
    }
  });

  const gun = useGun()

  gun
    .user(currentRoom.pub)
    .get(projectsPath)
    .map()
    .on((d, k) => {
      const data = { ...d }
      delete data._
      projects[k] = data

    })

  return { search, projects, candidates }
}


export function countProjects() {
  const list = reactive({})
  const gun = useGun()
  gun
    .user(currentRoom.pub)
    .get(projectsPath)
    .map()
    .once((d, k) => {
      list[k] = true
    })
  return computed(() => Object.keys(list).length)

}