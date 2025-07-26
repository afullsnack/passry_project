import { Container, Main, Section } from '@/components/craft'
import { createFileRoute } from '@tanstack/react-router'

const Route = createFileRoute('/_auth/login')({
  component: Login,
})

function Login() {
  return (
    <Main>
      <Section>
        <Container>
          <h1>Login Hero</h1>
        </Container>
        <Container>
          <h1>Login Form</h1>
        </Container>
      </Section>
    </Main>
  )
}
