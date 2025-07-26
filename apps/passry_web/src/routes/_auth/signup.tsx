import { Container, Main, Section } from '@/components/craft'
import { createFileRoute } from '@tanstack/react-router'

const Route = createFileRoute('/_auth/signup')({
  component: Singup,
})

function Signup() {
  return (
    <Main>
      <Section>
        <Container>
          <h1>Sign Up Hero</h1>
        </Container>
        <Container>
          <h1>Form</h1>
        </Container>
      </Section>
    </Main>
  )
}
