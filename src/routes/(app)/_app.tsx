import { Outlet, createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(app)/_app')({
  // beforeLoad: ({ context, location }) => {
  //   if (!context.auth.isAuthenticated) {
  //     throw redirect({
  //       to: '/login',
  //       search: {
  //         redirect: location.href,
  //       },
  //     })
  //   }
  // },
  component: AuthLayout,
})

function AuthLayout() {
  return (
    <div>
      <Outlet />
    </div>
  )
}
