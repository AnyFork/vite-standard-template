const modules = import.meta.glob('./**/*.ts', { eager: true }) as any
const route: any[] = []
Object.keys(modules).forEach((key) => {
    const item = modules[key].default
    if (item) {
        route.push(item)
    } else {
        window.console.error(`路由模块解析出错: key = ${key}`)
    }
})
export const routes = route
