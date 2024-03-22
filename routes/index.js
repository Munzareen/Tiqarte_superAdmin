const customRoutes = [{ path: "", element: <div></div> }]

const publicRoutes = [{ path: "", element: <div>hello</div> }]

const protectedRoutes = [
  {
    path: "test",
    element: "test",
    errorElement: "test",
  },
]

export { protectedRoutes, publicRoutes, customRoutes }
